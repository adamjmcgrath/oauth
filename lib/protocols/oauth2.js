import curry from 'lodash.curry';

export const authorizationUrl = curry(
  (url, _, { callback, scope, appId }) => Promise.resolve(
    `${url}?scope=${encodeURIComponent(scope)}&redirect_uri=
${encodeURIComponent(callback)}&response_type=token&client_id=${appId}`,
  ),
);

export const getHeaders = token => ({ Authorization: `Bearer ${token}` });
