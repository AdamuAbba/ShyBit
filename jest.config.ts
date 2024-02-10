import type { Config } from "jest/build/index.js";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coveragePathIgnorePatterns: ["/node_modules/"],
  coverageReporters: ["cobertura", "lcov", "text"],
  moduleDirectories: ["node_modules"],
  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node",
  ],
  notify: false,
  // The root directory that Jest should scan for tests and modules within
  // rootDir: undefined,

  // A list of paths to directories that Jest should use to search for files in
  // roots: [
  //   "<rootDir>"
  // ],

  silent: true,
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  setupFiles: ["./setupJest.ts"],
  testLocationInResults: false,
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)",
    "**/?(*.)+(spec|test).(m)js",
  ],
  testPathIgnorePatterns: ["/node_modules/"],
  verbose: true,
};

export default config;
