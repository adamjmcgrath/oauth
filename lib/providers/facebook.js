import curry from 'lodash.curry';
import {
  authorizationUrl,
  getAccessToken as _getAccessToken,
} from '../protocols/oauth2';

const AUTH = 'https://www.facebook.com/dialog/oauth';
const DEBUG_TOKEN = 'https://graph.facebook.com/debug_token';
const ME = 'https://graph.facebook.com/v2.8/me?fields=id,name,email';

const validateToken = curry((appId, obj) => {
  if (obj.data.app_id !== appId) {
    throw new Error('Invalid token');
  }
});

export const getAuthorizationUrl = authorizationUrl(AUTH);

export const getUser = curry((request, { appId }, code) =>
  request(`${DEBUG_TOKEN}?input_token=${code}&access_token=${code}`)
    .then(JSON.parse)
    .then(validateToken(appId))
    .then(() => request(`${ME}&access_token=${code}`))
    .then(JSON.parse));

export const providerOpts = {
  scope: 'email public_profile',
};

export const getAccessToken = _getAccessToken;
