import {
  curry,
  merge,
} from 'ramda';
import {
  authorizationUrl,
  getHeaders,
  accessToken,
} from '../protocols/oauth2';

const SCOPE = 'email profile';
const AUTH = 'https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN_INFO = 'https://www.googleapis.com/oauth2/v3/tokeninfo';
const ME = 'https://www.googleapis.com/oauth2/v2/userinfo';

const validateToken = curry((appId, obj) => {
  if (obj.aud !== appId) {
    throw new Error('Invalid token');
  }
});

export const authorize = ({ dance, request }, { appId, callback }) =>
  dance(authorizationUrl(AUTH, appId, callback, SCOPE))
    .then(accessToken)
    .then(code => ({ code }))
    .then(merge({ appId }));

export const identify = curry((request, { appId, code }) =>
  request(`${TOKEN_INFO}?access_token=${code}`)
    .then(JSON.parse)
    .then(validateToken(appId))
    .then(() => ({ headers: getHeaders(code) }))
    .then(opts => request(ME, opts))
    .then(JSON.parse),
  );
