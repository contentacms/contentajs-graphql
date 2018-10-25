module.exports = {
  '*.js': ['eslint --fix', 'prettier --write', 'git add'],
  '*.md': ['emdaer --yes', 'git add *.md'],
};
