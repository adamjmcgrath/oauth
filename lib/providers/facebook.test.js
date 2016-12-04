import assert from 'assert';
import * as facebook from './facebook';
import { REQUESTS, DANCE } from '../fixtures/facebook';
import * as test from '../platforms/test';
import login from '../../index';

describe('Facebook', () => {
  before(() => {
    test.setup(REQUESTS, DANCE);
  });

  it('should login', () => {
    const facebookTest = login(facebook, test);
    return facebookTest({
      appId: 'APPID123',
    })
    .then((user) => {
      assert.equal(user.id, 'USER123', 'user id');
      assert.equal(user.name, 'foo', 'user name');
      assert.equal(user.email, 'foo@gmail.com', 'user email');
    });
  });
});
