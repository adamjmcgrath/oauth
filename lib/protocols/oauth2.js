import {
  curry,
  match,
  nth,
  pipe,
} from 'ramda';

export const authorizationUrl = curry((url, appId, callback, scope) =>
  `${url}?scope=${encodeURIComponent(scope)}&
    redirect_uri=${encodeURIComponent(callback)}&
    response_type=token&
    client_id=${appId}`.replace(/\s+/g, ''),
  );

export const getHeaders = token => ({ Authorization: `Bearer ${token}` });

export const accessToken = pipe(
  match(/access_token=([^&]+)/),
  nth(1),
);
