import curry from 'lodash.curry';
import { authorizationUrl } from '../protocols/oauth2';

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
    .then(() => code));

export const providerOpts = {
  scope: 'email profile',
};
