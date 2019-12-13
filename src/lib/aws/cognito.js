import AWS from 'aws-sdk';
import config from '../../config';

const {
  REGION,
  USER_POOL_ID,
} = config.cognito;
const {
  awsKey,
  awsSecret,
} = config.credentials

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({
  region: REGION,
  accessKeyId: awsKey,
  secretAccessKey: awsSecret,
});

export function createUser(username, attributes) {
  const params = {
    UserPoolId: USER_POOL_ID,
    Username: username,
    DesiredDeliveryMediums: [
      "EMAIL",
    ],
    ForceAliasCreation: false,
    UserAttributes: attributes,
  };

  return new Promise((res, rej) => {
    cognitoIdentityServiceProvider.adminCreateUser(params, function(err, data) {
      if (err) {
        return rej(err);
      }
      
      res(data);
    });
  })
}

export function updateUserAttributes(id, attributes) {
  var params = {
    UserAttributes: attributes,
    UserPoolId: USER_POOL_ID, /* required */
    Username: id, /* required */
  };

  return new Promise((res, rej) => {
    cognitoIdentityServiceProvider.adminUpdateUserAttributes(params, (err, data) => {
      if (err) {
        return rej(err);
      }

      res(data);
    });
  });
}

export function listUsers() {
  const params = {
    UserPoolId: USER_POOL_ID,
  };

  return new Promise((res, rej) => {
    cognitoIdentityServiceProvider.listUsers(params, (err, data) => {
      if (err) {
        return rej(err);
      }

      res(data.Users);
    });
  });
}
