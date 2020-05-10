module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true,
        browser: true,
        jquery: true
    },
    extends: 'eslint:recommended',
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 11,
        sourceType: "module",
    },
    rules: {},
    plugins: ['html'],
};