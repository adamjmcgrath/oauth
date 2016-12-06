import https from 'https';
import http from 'http';
import opener from 'opener';
import url from 'url';
import querystring from 'querystring';

const REDIRECT_SCRIPT = `
  <script>
    location.href = location.href.replace(/\\??#/, '?');
  </script>
`;

const DONE_SCRIPT = `
  <script>
    window.close();
  </script>
`;

export const request = (uri, opts = {}) => new Promise((resolve, reject) => {
  const requestOpts = Object.assign({ method: 'GET' }, opts, url.parse(uri));
  const req = https.request(requestOpts, (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      resolve(rawData);
    });
    res.on('error', () => reject(rawData));
  });
  if (opts.data) {
    req.write(querystring.stringify(opts.data));
  }
  req.end();
});

export const dance = authUrl => new Promise((resolve) => {
  const server = http.createServer((req, res) => {
    const urlObj = url.parse(req.url, true);
    if (/^\?.+/.test(urlObj.search)) {
      resolve(urlObj.search);
      res.end(DONE_SCRIPT);
      server.close();
    } else {
      res.end(REDIRECT_SCRIPT);
    }
  });
  server.listen(3000);
  opener(authUrl);
});

export const opts = {
  callback: 'http://localhost:3000/callback',
};
