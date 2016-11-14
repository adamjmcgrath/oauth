import curry from 'lodash.curry';
import { authorizationUrl } from '../protocols/oauth2';

const AUTH = 'https://www.facebook.com/dialog/oauth';
const DEBUG_TOKEN = 'https://graph.facebook.com/debug_token';

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
    .then(() => code));

export const providerOpts = {
  scope: 'email public_profile',
};
