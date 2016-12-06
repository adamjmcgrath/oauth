const AUTH_URL = `https://api.instagram.com/oauth/authorize?
  scope=public_content&
  redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&
  response_type=token&
  client_id=APPID123
`.replace(/\s+/g, '');

const DANCE_CALLBACK = '?access_token=ACCESS123';

const ME_URL = `https://api.instagram.com/v1/users/self/?
  access_token=ACCESS123
`.replace(/\s+/g, '');

const ME_RESPONSE = {
  data: {
    username: 'foo',
    full_name: 'bar',
    id: 'USER123',
  },
};

export const DANCE = [AUTH_URL, DANCE_CALLBACK];

export const REQUESTS = [
  [ME_URL, {}, ME_RESPONSE, 'get user info'],
];
