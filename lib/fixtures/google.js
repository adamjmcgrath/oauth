/* eslint max-len: "off" */

const AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?
  scope=email%20profile&
  redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&
  response_type=token&
  client_id=APPID123
`.replace(/\s+/g, '');

const DANCE_CALLBACK = `?
  access_token=ACCESSTOKEN123&
  token_type=Bearer&
  expires_in=3600
`.replace(/\s+/g, '');

const VERIFY_URL = `https://www.googleapis.com/oauth2/v3/tokeninfo?
  access_token=ACCESSTOKEN123
`.replace(/\s+/g, '');

const VERIFY_RESPONSE = {
  azp: 'AZP123',
  aud: 'APPID123',
  sub: 'SUB123',
  scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
  exp: '123456789',
  expires_in: '3599',
  email: 'foo@gmail.com',
  email_verified: 'true',
  access_type: 'online',
};

const USER_INFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

const USER_INFO_OPTS = {
  headers: {
    Authorization: 'Bearer ACCESSTOKEN123',
  },
};

const USER_INFO_RESPONSE = {
  id: 'USER123',
  email: 'foo@gmail.com',
  verified_email: true,
  name: 'foo',
  given_name: 'Foo',
  family_name: 'Bar',
  link: 'https://plus.google.com/1234567890',
  picture: 'https://lh4.googleusercontent.com/ABC123/photo.jpg',
  gender: 'male',
  locale: 'en',
};

export const DANCE = [AUTH_URL, DANCE_CALLBACK];

export const REQUESTS = [
  [VERIFY_URL, {}, VERIFY_RESPONSE, 'verify token'],
  [USER_INFO_URL, USER_INFO_OPTS, USER_INFO_RESPONSE, 'get user info'],
];
