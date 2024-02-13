/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testMatch: ['**/?(*.)+(spec|test).+(ts|js)'],
    testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/build/"],
    transform: {
        '^.+\\.(js|ts)$': 'babel-jest',
    },
    moduleDirectories: ['node_modules', 'src'],
    collectCoverage: true,
    collectCoverageFrom: ['**/*.{js,ts}', '!**/*.d.ts'],
}
