#! /usr/bin/env node

const meow = require('meow');
const {
  init,
  list,
  getTypesForAlias,
  addNewType,
  updateType,
} = require('./utils/db');
const {formatList, validateSchema} = require('./utils/converter');
const {download, dbExists} = require('./utils/fetcher');
const {makePrompt, updatePrompt} = require('./utils/prompts');
const {errorChalk, infoChalk} = require('./utils/constants');

const cli = meow(
    `
    Usage
      $ foo [Input] [Option]

    Options
      --generate, -g  Generate a .gitignore
      --list, -l List all alias
      --make, -m make a new alias
      --update, -u update an alias
      --help, Displays the help menu

    Examples
      $ gig --generate mj
      $ gig --list
      $ gig --make
      $ gig --update mj
      $ gig --help
`,
    {
      booleanDefault: undefined,
      flags: {
        generate: {
          type: 'boolean',
          alias: 'g',
        },
        list: {
          type: 'boolean',
          alias: 'l',
        },
        make: {
          type: 'boolean',
          alias: 'm',
        },
        update: {
          type: 'boolean',
          alias: 'u',
        },
      },
    }
);

const run = async (input, flags) => {
  init(dbExists());

  switch (Object.keys(flags)[0]) {
    case 'generate':
      try {
        download(await getTypesForAlias(input));
      } catch (error) {
        handleError(error);
      }
      break;
    case 'list':
      console.log(infoChalk(formatList(await list())));
      break;
    case 'make':
      try {
        const newType = await makePrompt();
        await validateSchema(newType);
        await addNewType(newType);
      } catch (error) {
        handleError(error);
      }
      break;
    case 'update':
      try {
        const types = await getTypesForAlias(input);
        const updatedTypes = await updatePrompt(types);
        updatedTypes.alias = input;
        await validateSchema(updatedTypes);
        await updateType(updatedTypes, input);
      } catch (error) {
        handleError(error);
      }
      break;
    default:
      console.error(
          errorChalk('Please enter a valid option use gig --help for help')
      );
      process.exit(1);
      break;
  }
};

const handleError = (error) => {
  console.error(errorChalk(error.message));
  process.exit(1);
};

if (cli.input.length === 0 && Object.keys(cli.flags).length === 0) {
  console.error(
      errorChalk('Specify at least one input or option type gig --help for help')
  );
  process.exit(1);
}

run(cli.input[0], cli.flags);
