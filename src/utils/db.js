const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const {infoChalk} = require('./constants');

const homedir = require('os').homedir();

let adapter;
let db;

exports.init = async (exists) => {
  adapter = new FileSync(`${homedir}/.gig.json`);
  db = low(adapter);
  if (!exists) {
    console.log(infoChalk('Local config does not exist initalizing now'));
    await db
        .defaults({
          types: [
            {
              alias: 'mj',
              types: ['maven', 'java', 'osx', 'intellij+all', 'git'],
            },
          ],
        })
        .write();
    console.log(infoChalk('Local config has been initialized'));
  }
};

exports.list = async () => {
  return await db.get('types').value();
};

exports.getTypesForAlias = async (alias) => {
  const data = await db.get('types').find({alias: alias}).value();
  if (doesDataExist(data)) {
    return data.types;
  } else {
    throw new Error(`Alias ${alias} does not exist please make it first`);
  }
};

exports.addNewType = async (newType) => {
  const data = await db.get('types').find({alias: newType.alias}).value();
  if (!doesDataExist(data)) {
    await db.get('types').push(newType).write();
  } else {
    throw new Error(
        `Alias ${newType.alias} already exists please update instead of make`
    );
  }
};

exports.updateType = async (updatedTypes, alias) => {
  await db
      .get('types')
      .find({alias: alias})
      .assign({types: updatedTypes.types})
      .write();
};

const doesDataExist = (data) => {
  return data !== undefined;
};
