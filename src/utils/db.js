const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const {infoChalk} = require('./constants');
const {dbLocation} = require('./constants');

let adapter;
let db;

exports.init = async (exists) => {
  adapter = new FileSync(`${dbLocation}/.gig.json`);
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
  console.log(await doesDataExist(alias));
  if (await doesDataExist(alias)) {
    return await db.get('types').find({alias: alias}).value().types;
  } else {
    throw new Error(`Alias ${alias} does not exist please make it first`);
  }
};

exports.addNewType = async (newType) => {
  if (!await doesDataExist(newType.alias)) {
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

exports.deleteAlias = async (alias) => {
  if (doesDataExist(alias)) {
    await db.get('types').remove({alias: alias}).write();
  } else {
    throw new Error(
        `Alias ${newType.alias} does not exist so can not delete anything`
    );
  }
};

const doesDataExist = async (alias) => {
  const data = await db.get('types').find({alias: alias}).value();
  return data !== undefined;
};
