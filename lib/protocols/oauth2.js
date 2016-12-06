import {
  curry,
  match,
  nth,
  pipe,
} from 'ramda';

export const authorizationUrl = curry(
  (url, _, { callback, scope, appId }) => Promise.resolve(
    `${url}?scope=${encodeURIComponent(scope)}&
            redirect_uri=${encodeURIComponent(callback)}&
            response_type=token&
            client_id=${appId}`.replace(/\s+/g, ''),
  ),
);

export const getHeaders = token => ({ Authorization: `Bearer ${token}` });

export const accessToken = pipe(
  match(/access_token=([^&]+)/),
  nth(1),
);
