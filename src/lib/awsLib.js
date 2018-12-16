import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';
import config from '../config';
import sigV4Client from './sigV4Client';
import _get from 'lodash/get';

const noUserErrorMessage = 'User is not logged in'

function getAwsCredentials(userToken) {
  const authenticator = 
    `cognito-idp.${config.cognito.REGION}.amazonaws.com/${config.cognito.USER_POOL_ID}`;

  AWS.config.update({ region: config.cognito.REGION });
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: config.cognito.IDENTITY_POOL_ID,
    Logins: {
      [authenticator]: userToken
    }
  });

  return AWS.config.credentials.getPromise();
}

export function getCurrentUser() {
  const userPool = new CognitoUserPool({
    UserPoolId: config.cognito.USER_POOL_ID,
    ClientId: config.cognito.APP_CLIENT_ID
  })

  return userPool.getCurrentUser();
}

function getUserToken(currentUser) {
  return new Promise((resolve, reject) => {
    currentUser.getSession((err, session) => {
      if(err) {
        reject(err);
      } else {
        resolve(session.getIdToken().getJwtToken());
      }
    })
  })
}

export async function authUser() {
  const currentUser = getCurrentUser()

  if(currentUser === null) {
    return false;
  }
  const userToken = await getUserToken(currentUser);

  await getAwsCredentials(userToken);

  return currentUser;
}

export function getAuthenticatedUser(email, password) {
  const userPool = new CognitoUserPool({
    UserPoolId: config.cognito.USER_POOL_ID,
    ClientId: config.cognito.APP_CLIENT_ID
  })
  
  const user = new CognitoUser({
    Username: email,
    Pool: userPool
  })

  const authenticationData = {
    Username: email,
    Password: password
  }

  const authenticationDetails = new AuthenticationDetails(authenticationData)

  return new Promise((resolve, reject) => {
    user.authenticateUser(authenticationDetails, {
      onSuccess: result => resolve(getCurrentUser()),
      onFailure: err => reject(err)
    })
  })
}

export async function changeUserPassword(oldPassword, newPassword) {
  return new Promise(async (res, rej) => {
    const currentUser = await authUser();

    currentUser.getSession((sessionError, session) => {
      if (sessionError) {
        console.error({sessionError});

        return rej('Invalid Session');
      }

      console.log('session validity: ' + session.isValid());

      currentUser.changePassword(oldPassword, newPassword, (changePasswordError) => {
        if (changePasswordError) {
          console.error({changePasswordError})

          return rej({changePasswordError})
        }

        res('Successfully changed password')
      })
    })
  })
}

export async function signOutUser() {
  const currentUser = getCurrentUser();

  if(currentUser !== null) {
    currentUser.signOut();
  }

  if(AWS.config.credentials) {
    AWS.config.credentials.clearCachedId();
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({})
  }
}

export async function invokeApig({
  path,
  method = 'GET',
  headers = {},
  queryParams = {},
  body
}) {
  if(!await authUser()) {
    throw new Error(noUserErrorMessage);
  }

  const signedRequest = sigV4Client
    .newClient({
      accessKey: AWS.config.credentials.accessKeyId,
      secretKey: AWS.config.credentials.secretAccessKey,
      sessionToken: AWS.config.credentials.sessionToken,
      region: config.apiGateway.REGION,
      endpoint: config.apiGateway.URL
    })
    .signRequest({
      method,
      path,
      headers,
      queryParams,
      body
    })

  body = body ? JSON.stringify(body) : body
  headers = signedRequest.headers

  const results = await fetch(signedRequest.url, {
    method,
    headers,
    body
  })

  if(results.status !== 200) {
    throw new Error(await results.text());
  }

  return results.json();
}

export async function s3Upload(file) {
  if(!await authUser()) {
    throw new Error(noUserErrorMessage)
  }

  const s3 = new AWS.S3({
    params: {
      Bucket: config.s3.BUCKET
    }
  });
  const filename = `images/${AWS.config.credentials.identityId}-${Date.now()}-${file.name}`;

  return s3.upload({
    Key: filename,
    Body: file,
    ContentType: file.type,
    ACL: 'public-read'
  }).promise();
}

export async function s3Delete(filename) {
  if(!await authUser()) {
    throw new Error(noUserErrorMessage)
  }

  const currentUser = getCurrentUser();

  if(currentUser === null) {
    return false;
  }

  const userToken = await getUserToken(currentUser);

  await getAwsCredentials(userToken);

  const s3 = new AWS.S3({
    params: {
      Bucket: config.s3.BUCKET
    }
  });

  return s3.deleteObject({
    Key: decodeURIComponent(new URL(filename).pathname.substring(1)),
  }).promise();
}