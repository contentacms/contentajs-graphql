module.exports.husky = {
  hooks: {
    'commit-msg': 'commitlint -e ${HUSKY_GIT_PARAMS}',
    'pre-commit': 'lint-staged && npm run flow',
    'pre-push': 'npm run test',
  },
};
