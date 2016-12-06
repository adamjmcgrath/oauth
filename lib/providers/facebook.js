import {
  curry,
  merge,
} from 'ramda';
import {
  authorizationUrl,
  accessToken,
} from '../protocols/oauth2';

const SCOPE = 'email public_profile';
const AUTH = 'https://www.facebook.com/dialog/oauth';
const DEBUG_TOKEN = 'https://graph.facebook.com/debug_token';
const ME = 'https://graph.facebook.com/v2.8/me?fields=id,name,email';

const validateToken = curry((appId, obj) => {
  if (obj.data.app_id !== appId) {
    throw new Error('Invalid token');
  }
});

export const authorize = ({ dance, request }, { appId, callback }) =>
  dance(authorizationUrl(AUTH, appId, callback, SCOPE))
    .then(accessToken)
    .then(code => ({ code }))
    .then(merge({ appId }));

export const identify = curry((request, { appId, code }) =>
  request(`${DEBUG_TOKEN}?input_token=${code}&access_token=${code}`)
    .then(JSON.parse)
    .then(validateToken(appId))
    .then(() => request(`${ME}&access_token=${code}`))
    .then(JSON.parse));
