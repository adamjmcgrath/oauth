import signature, {
  getNonce,
  getNow,
  toQueryString,
  encode,
} from '../protocols/signature';
import { tap, assert } from '../utils';

const REQUEST_TOKEN = 'https://api.twitter.com/oauth/request_token';
const AUTH = 'https://api.twitter.com/oauth/authenticate';

export const queryStringToJson = resp => resp.split('&')
    .reduce((obj, item) => {
      const pair = item.split('=');
      const ret = obj;
      ret[pair[0]] = pair[1];
      return ret;
    }, {});

export const verifyCallback = resp =>
  assert('Unconfirmed callback', resp.oauth_callback_confirmed === 'true');

export const getHeaders = (url, params, consumerKey, consumerSecret) => {
  const nonce = getNonce(32);
  const now = getNow();
  const sig = signature({
    url: REQUEST_TOKEN,
    consumerKey,
    consumerSecret,
    params,
    nonce,
    now,
  });
  const header = `OAuth oauth_callback="${encode(url)}",
                        oauth_consumer_key="${encode(consumerKey)}",
                        oauth_nonce="${encode(nonce)}",
                        oauth_signature="${encode(sig)}",
                        oauth_signature_method="HMAC-SHA1",
                        oauth_timestamp="${encode(now)}",
                        oauth_version="1.0"`.replace(/\n +/g, ' ');
  return { Authorization: header };
};

export const getAuthorizationUrl = (request, {
  appId,
  appSecret,
  callback }) => {
  const params = {
    oauth_callback: callback,
  };
  const headers = getHeaders(callback, params, appId, appSecret);
  const url = `${REQUEST_TOKEN}?${toQueryString(params)}`;
  return request(url, { method: 'POST', headers })
    .then(queryStringToJson)
    .then(tap(verifyCallback))
    .then(obj => `${AUTH}?oauth_token=${obj.oauth_token}`);
};

export const getUser = code => code;
