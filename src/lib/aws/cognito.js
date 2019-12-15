import AWS from 'aws-sdk';
import config from '../../config';
import _find from 'lodash/find';
import _get from 'lodash/get';
import _map from 'lodash/map';

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
    cognitoIdentityServiceProvider.adminCreateUser(params, (err, data) => {
      if (err) {
        return rej(err);
      }
      
      res(data);
    });
  })
}

export function updateUserAttributes(token, attributes) {
  const params = {
    AccessToken: token, /* required */
    UserAttributes: attributes,
  };

  return new Promise((res, rej) => {
    cognitoIdentityServiceProvider.updateUserAttributes(params, (err, data) => {
      if (err) {
        return rej(err)
      }
      
      res(data);
    });
  });
}

export function adminUpdateUserAttributes(id, attributes) {
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

function getAttributeValue(attributes, name) {
  const attribute = _find(attributes, { Name: name });

  return _get(attribute, 'Value');
}

function formatUserData({
  Attributes,
  UserCreatedDate,
  Username,
  UserStatus,
}) {
  const firstName = getAttributeValue(Attributes, 'preferred_username') ||
    getAttributeValue(Attributes, 'given_name');
  const lastName = getAttributeValue(Attributes, 'family_name');
  const email = getAttributeValue(Attributes, 'email');
  const name = firstName && lastName
    ? `${firstName} ${lastName}`
    : email;

  return {
    id: Username,
    active: UserStatus === 'CONFIRMED',
    created: UserCreatedDate,
    attributes: Attributes,
    name
  }
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

      const formattedUsers = _map(data.Users, formatUserData);
      
      res(formattedUsers);
    });
  });
}
