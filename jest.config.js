/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    "\\.ts": ["ts-jest", { tsconfig: 'tsconfig.test.json' }]
  },
  setupFilesAfterEnv: ["./scripts/setup-jest.ts"]
};