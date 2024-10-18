/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jsdom",
  testMatch: ["**/test/**.test.tsx"],
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};