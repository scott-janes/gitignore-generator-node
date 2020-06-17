const prompts = require('prompts');
const {fetchTemplate} = require('./fetcher');

const {
  formatTemplateToPrompterForUpdate,
  formatTemplateToPrompterForMake,
} = require('./converter');

const questions = [
  {
    type: 'text',
    name: 'alias',
    message: 'What alias do you want to set?',
  },
  {
    type: 'autocompleteMultiselect',
    name: 'types',
    message: 'Pick Operating Systems, IDEs or Programming Languages',
    choices: [],
    optionsPerPage: 20,
    hint: '- Space to select. Return to submit',
  },
];

exports.makePrompt = async () => {
  const template = await fetchTemplate();
  const choices = formatTemplateToPrompterForMake(template);
  questions[1].choices = choices;
  const response = await prompts(questions);
  return response;
};

exports.updatePrompt = async (types) => {
  const template = await fetchTemplate();
  const choices = formatTemplateToPrompterForUpdate(template, types);
  questions.shift();
  questions[0].choices = choices;
  const response = await prompts(questions);
  return response;
};
