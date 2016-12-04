import assert from 'assert';
import * as google from './google';
import { REQUESTS, DANCE } from '../fixtures/google';
import * as test from '../platforms/test';
import login from '../../index';

describe('Google', () => {
  before(() => {
    test.setup(REQUESTS, DANCE);
  });

  it('should login', () => {
    const googleTest = login(google, test);
    return googleTest({
      appId: 'APPID123',
    })
    .then((user) => {
      assert.equal(user.id, 'USER123', 'user id');
      assert.equal(user.name, 'foo', 'user name');
      assert.equal(user.email, 'foo@gmail.com', 'user email');
    });
  });
});
