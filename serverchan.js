const https = require('https');
const assert = require('assert');

const {
  SERVERCHAN_API = 'https://sctapi.ftqq.com',
  SERVERCHAN_SENDKEY,
} = process.env;

const get = url =>
  new Promise(done => https.get(url, done));

const readStream = res => new Promise((resolve, reject) => {
  const buffer = [];
  res
    .on('error', reject)
    .on('data', chunk => buffer.push(chunk))
    .on('end', () => resolve(Buffer.concat(buffer)))
});

/**
 * ServerChan
 * https://sct.ftqq.com
 */
class ServerChan {
  constructor({ api = SERVERCHAN_API, sckey = SERVERCHAN_SENDKEY }) {
    assert.ok(api);
    assert.ok(sckey);
    this.api = api;
    this.sckey = sckey;
  }
  sendMessage(title, content) {
    const { api, sckey } = this;
    return Promise
      .resolve()
      .then(() => get(`${api}/${sckey}.send?title=${encodeURIComponent(title)}&desp=${encodeURIComponent(content)}`))
      .then(readStream)
      .then(JSON.parse)
      .then(res => {
        assert.equal(res.code, 0, res.message);
        return res.data;
      });
  }
}

module.exports = ServerChan;
