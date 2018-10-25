/* @flow */

const readRelativeFile = require('../helpers/readFileUtf8')(__dirname);

module.exports = [readRelativeFile('./directives.graphql')];
