export default {
  clearMocks: true,
  moduleFileExtensions: ["js", "ts"],
  roots: ["src/tests"],
  testEnvironment: "node",
  testResultsProcessor: "jest-sonar-reporter",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  setupFilesAfterEnv: ["jest-extended"],
  coverageThreshold: {
    global: {
      lines: 50,
    },
  },
  coverageDirectory: "./coverage",
  globals: {
    "ts-jest": {
      diagnostics: false,
    },
  },
  testTimeout: 20000,
};
