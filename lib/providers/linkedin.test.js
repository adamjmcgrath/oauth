import assert from 'assert';
import * as linkedin from './linkedin';
import { REQUESTS, DANCE } from '../fixtures/linkedin';
import * as test from '../platforms/test';
import login from '../../index';

describe('Linkedin', () => {
  before(() => {
    test.setup(REQUESTS, DANCE);
  });

  it('should login', () => {
    const linkedinTest = login(linkedin, test);
    return linkedinTest({
      appId: 'APPID123',
      appSecret: 'SECRET123',
    })
    .then((user) => {
      assert.equal(user.id, 'USER123', 'user id');
      assert.equal(user.firstName, 'foo', 'user first name');
      assert.equal(user.lastName, 'bar', 'user last name');
    });
  });
});
