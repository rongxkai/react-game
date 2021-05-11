module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: ["eslint:recommended", "plugin:vue/essential"],
    globals: {
        uni: true,
        process: true
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module"
    },
    plugins: ["vue"],
    rules: {
        indent: ["error", "tab"],
        "linebreak-style": ["error", "windows"],
        quotes: ["error", "single"],
        semi: ["error", "always"]
    }
};
