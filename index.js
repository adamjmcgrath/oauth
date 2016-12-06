import { curry, mergeAll } from 'ramda';

export default curry((provider, platform, opts) =>
  provider.authUrl(
    platform.request, mergeAll([platform.opts, provider.opts, opts]),
  )
  .then(platform.dance)
  .then(provider.accessToken)
  .then(provider.identify(platform.request, opts)),
);
