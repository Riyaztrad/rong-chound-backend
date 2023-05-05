const _ = require('lodash');
const env = process.env.port || 'local';
const envConfig = require('./' + env);
let defaultConfig = {
  env: env
};
module.exports = _.merge(defaultConfig, envConfig);