import {
  curry,
  prop,
} from 'ramda';
import {
  authorizationUrl,
  accessToken as _accessToken,
} from '../protocols/oauth2';

const AUTH = 'https://api.instagram.com/oauth/authorize';
const ME = 'https://api.instagram.com/v1/users/self/';

export const authUrl = authorizationUrl(AUTH);

export const identify = curry((request, { appId }, code) =>
  request(`${ME}?access_token=${code}`)
    .then(JSON.parse)
    .then(prop('data')),
  );

export const opts = {
  scope: 'public_content',
};

export const accessToken = _accessToken;
