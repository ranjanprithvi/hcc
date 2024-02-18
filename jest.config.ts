export default {
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                diagnostics: {
                    ignoreCodes: [1343],
                },
                astTransformers: {
                    before: [
                        {
                            path: "node_modules/ts-jest-mock-import-meta", // or, alternatively, 'ts-jest-mock-import-meta' directly, without node_modules.
                            options: {
                                metaObjectReplacement: {
                                    env: {
                                        VITE_BACKEND_URL:
                                            "http://localhost:8080",
                                    },
                                },
                            },
                        },
                    ],
                },
            },
        ],
        // process `*.tsx` files with `ts-jest`
    },
    rootDir: "./",
    moduleNameMapper: {
        "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    },
    // setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    moduleDirectories: ["node_modules", "src"],
};
