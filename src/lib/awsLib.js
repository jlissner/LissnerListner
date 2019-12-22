import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';
import config from '../config';
import sigV4Client from './sigV4Client';

const noUserErrorMessage = 'User is not logged in'

export async function invokeApig({
  path,
  method = 'GET',
  headers = {},
  queryParams = {},
  body
}) {
  throw new Error('Stop Using this.');

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

// export async function s3Upload(file) {
//   if(!await authUser()) {
//     throw new Error(noUserErrorMessage)
//   }
// 
//   const s3 = new AWS.S3({
//     params: {
//       Bucket: config.s3.BUCKET
//     }
//   });
//   const filename = `images/${AWS.config.credentials.identityId}-${Date.now()}-${file.name}`;
// 
//   return s3.upload({
//     Key: filename,
//     Body: file,
//     ContentType: file.type,
//     ACL: 'public-read'
//   }).promise();
// }
// 
// export async function s3Delete(filename) {
//   if(!await authUser()) {
//     throw new Error(noUserErrorMessage)
//   }
// 
//   const currentUser = getCurrentUser();
// 
//   if(currentUser === null) {
//     return false;
//   }
// 
//   const userToken = await getUserToken(currentUser);
// 
//   await getAwsCredentials(userToken);
// 
//   const s3 = new AWS.S3({
//     params: {
//       Bucket: config.s3.BUCKET
//     }
//   });
// 
//   return s3.deleteObject({
//     Key: decodeURIComponent(new URL(filename).pathname.substring(1)),
//   }).promise();
// }