import curry from 'lodash.curry';
import * as cmd from './lib/platforms/cmd';
import * as google from './lib/providers/google';
import * as facebook from './lib/providers/facebook';
import * as twitter from './lib/providers/twitter';

const assign = Object.assign;

const login = curry(
  ({ getAuthorizationUrl, getUser, providerOpts },
   { dance, request, platformOpts }, opts) =>
   getAuthorizationUrl(request, assign({}, providerOpts, platformOpts, opts))
    .then(dance)
    .then(getUser(request, opts)),
);

export const googleCmd = login(google, cmd);
export const facebookCmd = login(facebook, cmd);
export const twitterCmd = login(twitter, cmd);
