import {
  curry,
} from 'ramda';
import {
  authorizationUrl,
  getHeaders,
  parseCode,
} from '../protocols/oauth2';

const SCOPE = 'r_basicprofile r_emailaddress';
const AUTH = 'https://www.linkedin.com/oauth/v2/authorization';
const ACCESS_TOKEN = 'https://www.linkedin.com/oauth/v2/accessToken';
const ME = 'https://api.linkedin.com/v1/people/~?format=json';

export const authorize = ({ dance, request }, { appId, appSecret, callback }) =>
  dance(authorizationUrl(AUTH, appId, callback, SCOPE, 'code'))
    .then(parseCode)
    .then(code => request(ACCESS_TOKEN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: callback,
        client_id: appId,
        client_secret: appSecret,
      },
    })
    .then(JSON.parse),
  );

export const identify = curry((request, { access_token }) =>
  request(ME, { headers: getHeaders(access_token) })
    .then(JSON.parse),
);
