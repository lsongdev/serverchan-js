const ServerChan = require('..');

const chan = new ServerChan({
  sckey: 'SCT82268Td2xus2Ms6YDvKbVIqaNNELzx'
});

(async () => {
  const res = await chan.sendMessage('node-serverchan', 'hello world')
  console.log(res);
})();