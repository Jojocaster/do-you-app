module.exports = {
  preset: 'jest-expo',
  setupFiles: ['./jestSetup.js'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['./jestSetupMocks.js'],
  // setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
