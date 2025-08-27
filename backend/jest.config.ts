import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest/presets/default-esm', // soporte ESM con ts-jest
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1', // corrige imports con extensión .js en TS
    },
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                useESM: true,
            },
        ],
    },
};

export default config;
