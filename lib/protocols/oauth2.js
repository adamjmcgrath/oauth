import {
  curry,
  match,
  nth,
  pipe,
} from 'ramda';

export const authorizationUrl = curry(
  (url, appId, callback, scope, responseType = 'token') =>
    `${url}?scope=${encodeURIComponent(scope)}&
      redirect_uri=${encodeURIComponent(callback)}&
      response_type=${responseType}&
      client_id=${appId}`.replace(/\s+/g, ''),
  );

export const getHeaders = token => ({ Authorization: `Bearer ${token}` });

export const accessToken = pipe(
  match(/access_token=([^&]+)/),
  nth(1),
);

export const parseCode = pipe(
  match(/code=([^&]+)/),
  nth(1),
);
