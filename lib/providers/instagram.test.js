import assert from 'assert';
import * as instagram from './instagram';
import { REQUESTS, DANCE } from '../fixtures/instagram';
import * as test from '../platforms/test';
import login from '../../index';

describe('Instagram', () => {
  before(() => {
    test.setup(REQUESTS, DANCE);
  });

  it('should login', () => {
    const instagramTest = login(instagram, test);
    return instagramTest({
      appId: 'APPID123',
    })
    .then((user) => {
      assert.equal(user.id, 'USER123', 'user id');
      assert.equal(user.username, 'foo', 'user name');
    });
  });
});
