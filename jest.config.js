module.exports = {
  coverageDirectory: '__coverage__',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  collectCoverageFrom: [
    '<rootDir>/src/**',
    '!<rootDir>/src/**/__snapshots__/**',
  ],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/lib', '<rootDir>/config'],
  setupTestFrameworkScriptFile: '<rootDir>/jest.setup.js',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};
