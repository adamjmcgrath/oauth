/* eslint camelcase: "off" */
import {
  curry,
  merge,
} from 'ramda';
import {
  requestToken,
  accessToken,
  getHeaders,
  queryStringToJson,
} from '../protocols/oauth1';

const REQUEST_TOKEN = 'https://api.twitter.com/oauth/request_token';
const AUTH = 'https://api.twitter.com/oauth/authenticate';
const ACCESS_TOKEN = 'https://api.twitter.com/oauth/access_token';
const VERIFY_CREDENTIALS =
  'https://api.twitter.com/1.1/account/verify_credentials.json';

export const authorize = ({ dance, request }, { appId, appSecret, callback }) =>
  requestToken(REQUEST_TOKEN, request, appId, appSecret, callback)
    .then(({ oauth_token, oauth_token_secret }) =>
      dance(`${AUTH}?oauth_token=${oauth_token}`)
        .then(queryStringToJson)
        .then(merge({ appId, appSecret, oauth_token_secret }))
        .then(accessToken(ACCESS_TOKEN, request))
        .then(merge({ appId, appSecret })),
      );

export const identify = curry(
  (request, { appId, appSecret, oauth_token, oauth_token_secret }) => {
    const headers = getHeaders(VERIFY_CREDENTIALS, {}, {}, appId, appSecret,
      'GET', oauth_token, oauth_token_secret);
    return request(VERIFY_CREDENTIALS, { headers }).then(JSON.parse);
  },
);
