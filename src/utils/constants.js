const chalk = require('chalk');

const errorColour = process.env.GIG_ERROR_COLOUR || '#FF00FF';
const infoColour = process.env.GIG_INFO_COLOUR || '#32CD32';

exports.errorChalk = chalk.hex(errorColour);
exports.infoChalk = chalk.hex(infoColour);
exports.dbLocation = process.env.GIG_DB_LOCATION || require('os').homedir();
