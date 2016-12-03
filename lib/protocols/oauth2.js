import {
  curry,
  match,
  nth,
  pipe,
} from 'ramda';

export const authorizationUrl = curry(
  (url, _, { callback, scope, appId }) => Promise.resolve(
    `${url}?scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(callback)}&response_type=token&client_id=${appId}`,
  ),
);

export const getHeaders = token => ({ Authorization: `Bearer ${token}` });

export const getAccessToken = pipe(
  match(/access_token=([^&]+)/),
  nth(1),
);
