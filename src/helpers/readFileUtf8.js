/* @flow */

const _ = require('lodash');
const { readFile } = require('fs-extra');
const path = require('path');

/**
 * Retrieve a file's contents with utf8 encoding.
 *
 * @param {string} dir
 *   If a path is relative, use this directory as a base.
 * @param {string} path
 *   The relative path to the file whose contents should be retrieved.
 *
 * @return {string}
 *   The file's contents as a UTF-8 encoded string.
 */
const readRelative = async (dir: string, p: string): Promise<string> =>
  readFile(path.join(dir, p), 'utf8');

module.exports = _.curry(readRelative);
