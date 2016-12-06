/* eslint camelcase: "off" */
import {
  curry,
  merge,
  path,
} from 'ramda';
import {
  requestToken,
  accessToken,
  getHeaders,
  queryStringToJson,
} from '../protocols/oauth1';

const REQUEST_TOKEN = 'https://www.tumblr.com/oauth/request_token';
const AUTH = 'https://www.tumblr.com/oauth/authorize';
const ACCESS_TOKEN = 'https://www.tumblr.com/oauth/access_token';
const ME = 'https://api.tumblr.com/v2/user/info';

export const verifyCallback = resp => resp;

export const authorize = ({ dance, request, opts }, { appId, appSecret }) =>
  requestToken(REQUEST_TOKEN, request, appId, appSecret, opts.callback)
    .then(({ oauth_token, oauth_token_secret }) =>
      dance(`${AUTH}?oauth_token=${oauth_token}`)
        .then(queryStringToJson)
        .then(merge({ appId, appSecret, oauth_token_secret }))
        .then(accessToken(ACCESS_TOKEN, request))
        .then(merge({ appId, appSecret })),
      );

export const identify = curry(
  (request, { appId, appSecret, oauth_token, oauth_token_secret }) => {
    const headers = getHeaders(ME, {}, {}, appId, appSecret,
      'GET', oauth_token, oauth_token_secret);
    return request(ME, { headers })
      .then(JSON.parse)
      .then(path(['response', 'user']))
  },
);
