import {
  tap,
} from 'ramda';
import signature, {
  getNonce,
  getNow,
  toQueryString,
  encode,
} from '../protocols/signature';

const REQUEST_TOKEN = 'https://api.twitter.com/oauth/request_token';
const AUTH = 'https://api.twitter.com/oauth/authenticate';
const ACCESS_TOKEN = 'https://api.twitter.com/oauth/access_token';
const VERIFY_CREDENTIALS =
  'https://api.twitter.com/1.1/account/verify_credentials.json';

let testNonce;
let testNow;

const assert = (err, test) => {
  if (!test) {
    throw new Error(err);
  }
};

export const queryStringToJson = resp => resp
    .replace(/^\?/, '')
    .split('&')
    .reduce((obj, item) => {
      const pair = item.split('=');
      const ret = obj;
      ret[pair[0]] = pair[1];
      return ret;
    }, {});

export const verifyCallback = resp =>
  assert('Unconfirmed callback', resp.oauth_callback_confirmed === 'true');

export const getHeaders = (url, params, data, consumerKey, consumerSecret,
                           method, oauthToken = '', oauthSecret = '') => {
  const nonce = testNonce || getNonce(32);
  const now = testNow || getNow();
  const sig = signature({
    url,
    consumerKey,
    consumerSecret,
    oauthToken,
    oauthSecret,
    params,
    method,
    data,
    nonce,
    now,
  });
  const header = `OAuth oauth_consumer_key="${encode(consumerKey)}",
    oauth_nonce="${encode(nonce)}",
    oauth_signature="${encode(sig)}",
    oauth_signature_method="HMAC-SHA1",
    oauth_timestamp="${encode(now)}",
    ${oauthToken && 'oauth_token="'}${oauthToken}${oauthToken && '",'}
    oauth_version="1.0"`.replace(/\n? +\n? */g, ' ');
  return { Authorization: header };
};

export const authUrl = (request, {
  appId,
  appSecret,
  callback }) => {
  const params = {
    oauth_callback: callback,
  };
  const headers = getHeaders(
    REQUEST_TOKEN, params, {}, appId, appSecret, 'POST');
  const url = `${REQUEST_TOKEN}?${toQueryString(params)}`;
  return request(url, { method: 'POST', headers })
    .then(queryStringToJson)
    .then(tap(verifyCallback))
    .then(obj => `${AUTH}?oauth_token=${obj.oauth_token}`);
};

export const identify =
  (request, { appId, appSecret }) => ({ oauth_token, oauth_verifier }) => {
    const data = { oauth_verifier };
    let headers = Object.assign(
      { 'Content-Type': 'application/x-www-form-urlencoded' },
      getHeaders(
        ACCESS_TOKEN, {}, data, appId, appSecret, 'POST', oauth_token));

    return request(ACCESS_TOKEN, { method: 'POST', headers, data })
      .then(queryStringToJson)
      .then((resp) => {
        headers = getHeaders(VERIFY_CREDENTIALS, {}, {}, appId, appSecret,
          'GET', resp.oauth_token, resp.oauth_token_secret);
        return request(VERIFY_CREDENTIALS, { headers });
      })
      .then(JSON.parse);
  };

export const accessToken = queryStringToJson;

export const setupForTesting = (nonce, now) => {
  testNonce = nonce;
  testNow = now;
};
