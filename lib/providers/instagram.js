import {
  curry,
  merge,
  prop,
} from 'ramda';
import {
  authorizationUrl,
  accessToken,
} from '../protocols/oauth2';

const SCOPE = 'public_content';
const AUTH = 'https://api.instagram.com/oauth/authorize';
const ME = 'https://api.instagram.com/v1/users/self/';

export const authorize = ({ dance, request }, { appId, callback }) =>
  dance(authorizationUrl(AUTH, appId, callback, SCOPE))
    .then(accessToken)
    .then(code => ({ code }))
    .then(merge({ appId }));

export const identify = curry((request, { code }) =>
  request(`${ME}?access_token=${code}`)
    .then(JSON.parse)
    .then(prop('data')),
);
