import https from 'https';
import http from 'http';
import opener from 'opener';
import url from 'url';

const REDIRECT_SCRIPT = `
  <script>
    location.href = location.href.replace(/\\??#/, '?');
  </script>
`;

export const request = (uri, opts) => new Promise((resolve, reject) => {
  const requestOpts = Object.assign({ method: 'GET' }, opts, url.parse(uri));
  https.request(requestOpts, (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => resolve(rawData));
    res.on('error', () => reject(rawData));
  }).end();
});

export const dance = authUrl => new Promise((resolve) => {
  const server = http.createServer((req, res) => {
    const urlObj = url.parse(req.url, true);
    if (/^\?.+/.test(urlObj.search)) {
      resolve(urlObj.search);
      res.end('done');
      server.close();
    } else {
      res.end(REDIRECT_SCRIPT);
    }
  });
  server.listen(3000);
  opener(authUrl);
});

export const platformOpts = {
  callback: 'http://localhost:3000/callback',
};
