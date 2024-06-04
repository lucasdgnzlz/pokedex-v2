module.exports = {
  setupFiles: [],
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  testPathIgnorePatterns: ['/node_modules/', '.*.fixture.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
