/* eslint-disable no-console */
const pd = require('../package.json').peerDependencies;

console.log(
  Object.keys(pd)
    .map(key => `${key}@${pd[key]}`)
    .join(' ')
);
