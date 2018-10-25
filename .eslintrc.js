const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  parser: 'babel-eslint',
  env: { node: true },
  plugins: ['prettier', 'flowtype'],
  extends: ['problems', 'plugin:prettier/recommended'],
  rules: {
    'flowtype/define-flow-type': ERROR,
  },
  overrides: [
    {
      files: ['**/*.test.js', '**/*.mock.js', 'jest.setup.js'],
      env: { jest: true },
    },
  ],
};
