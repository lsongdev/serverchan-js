#!/usr/bin/env node

const ServerChan = require('..');

const chan = new ServerChan();

const [ title, content ] = process.argv.slice(2);

chan.sendMessage(title, content);