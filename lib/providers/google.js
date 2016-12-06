import {
  curry,
} from 'ramda';
import {
  authorizationUrl,
  getHeaders,
  accessToken as _accessToken,
} from '../protocols/oauth2';

const AUTH = 'https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN_INFO = 'https://www.googleapis.com/oauth2/v3/tokeninfo';

const validateToken = curry((appId, obj) => {
  if (obj.aud !== appId) {
    throw new Error('Invalid token');
  }
});

export const authUrl = authorizationUrl(AUTH);

export const identify = curry((request, { appId }, code) =>
  request(`${TOKEN_INFO}?access_token=${code}`)
    .then(JSON.parse)
    .then(validateToken(appId))
    .then(() => ({ headers: getHeaders(code) }))
    .then(opts => request(
      'https://www.googleapis.com/oauth2/v2/userinfo', opts))
    .then(JSON.parse),
  );

export const opts = {
  scope: 'email profile',
};

export const accessToken = _accessToken;
