import assert from 'assert';
import * as twitter from './twitter';
import { REQUESTS, DANCE } from '../fixtures/twitter';
import * as test from '../platforms/test';
import login from '../../index';

describe('Twitter', () => {
  before(() => {
    test.setup(REQUESTS, DANCE);
    twitter.setupForTesting('123ABC', 1234567890);
  });

  it('should login', () => {
    const twitterTest = login(twitter, test);
    return twitterTest({
      appId: 'APPID123',
      appSecret: 'APPSECRET123',
    })
    .then((user) => {
      assert.equal(user.id, 123, 'user id');
      assert.equal(user.name, 'foo', 'user name');
      assert.equal(user.screen_name, 'bar', 'user screen name');
    });
  });
});
