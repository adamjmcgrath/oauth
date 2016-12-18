const AUTH_URL = `https://www.linkedin.com/oauth/v2/authorization?
  scope=r_basicprofile%20r_emailaddress&
  redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&
  response_type=code&
  client_id=APPID123
`.replace(/\s+/g, '');

const DANCE_CALLBACK = '?code=CODE123';

const ACCESS_TOKEN_URL = 'https://www.linkedin.com/oauth/v2/accessToken';

const ACCESS_TOKEN_OPTS = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: {
    grant_type: 'authorization_code',
    code: 'CODE123',
    redirect_uri: 'http://localhost:3000/callback',
    client_id: 'APPID123',
    client_secret: 'SECRET123',
  },
};

const ACCESS_TOKEN_RESPONSE = {
  access_token: 'ACCESS123',
  expires_in: 5184000,
};

const USER_INFO_URL = 'https://api.linkedin.com/v1/people/~?format=json';
const USER_INFO_OPTS = {
  headers: {
    Authorization: 'Bearer ACCESS123',
  },
};

const USER_INFO_RESPONSE = {
  firstName: 'foo',
  headline: 'HEADLINE123',
  id: 'USER123',
  lastName: 'bar',
  siteStandardProfileRequest: {},
};

export const DANCE = [AUTH_URL, DANCE_CALLBACK];

export const REQUESTS = [
  [ACCESS_TOKEN_URL, ACCESS_TOKEN_OPTS, ACCESS_TOKEN_RESPONSE, 'access token'],
  [USER_INFO_URL, USER_INFO_OPTS, USER_INFO_RESPONSE, 'get user info'],
];
