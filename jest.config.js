module.exports = {
  preset: "jest-expo",
  testPathIgnorePatterns: ["/node_modules", "/android", "/ios"],
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "jest-styled-components",
    './jest-setup.ts'
  ],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.tsx', '!src/**/*.spec.tsx'],
  coverageReporters: ['lcov']
};
