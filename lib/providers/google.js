import {
  curry,
} from 'ramda';
import {
  authorizationUrl,
  getHeaders,
  getAccessToken as _getAccessToken,
} from '../protocols/oauth2';

const AUTH = 'https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN_INFO = 'https://www.googleapis.com/oauth2/v3/tokeninfo';

const validateToken = curry((appId, obj) => {
  if (obj.aud !== appId) {
    throw new Error('Invalid token');
  }
});

export const getAuthorizationUrl = authorizationUrl(AUTH);

export const getUser = curry((request, { appId }, code) =>
  request(`${TOKEN_INFO}?access_token=${code}`)
    .then(JSON.parse)
    .then(validateToken(appId))
    .then(() => ({ headers: getHeaders(code) }))
    .then(curry(request)('https://www.googleapis.com/oauth2/v2/userinfo'))
    .then(JSON.parse));

export const providerOpts = {
  scope: 'email profile',
};

export const getAccessToken = _getAccessToken;
