import { curry } from 'ramda';

const assign = Object.assign;

export default curry(
  ({ getAuthorizationUrl, getAccessToken, getUser, providerOpts },
   { dance, request, platformOpts }, opts) =>
   getAuthorizationUrl(request, assign({}, providerOpts, platformOpts, opts))
    .then(dance)
    .then(getAccessToken)
    .then(getUser(request, opts)),
);
