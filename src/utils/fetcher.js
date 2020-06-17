const fetch = require('node-fetch');
const util = require('util');
const fs = require('fs');
const streamPipeline = util.promisify(require('stream').pipeline);
const URL = 'https://www.toptal.com/developers/gitignore';

exports.download = async (list) => {
  const response = await fetch(`${URL}/api/${list.toString()}`);
  if (!response.ok) {
    throw new Error(`unexpected response ${response.statusText}`);
  }
  await streamPipeline(response.body, fs.createWriteStream('./.gitignore'));
};

exports.fetchTemplate = async (list) => {
  const response = await fetch(`${URL}/dropdown/templates.json`);
  if (!response.ok) {
    throw new Error(`unexpected response ${response.statusText}`);
  }
  const body = await response.json();
  return body;
};

exports.dbExists = () => {
  const homedir = require('os').homedir();
  return fs.existsSync(`${homedir}/.gig.json`);
};
