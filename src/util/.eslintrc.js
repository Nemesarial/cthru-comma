module.exports = {
    root: true,
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "standard",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "arrow-parens": 0,
        "generator-star-spacing": 0,
        "no-debugger": 0,

        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "array-element-newline": [
            "error",
            "consistent"
        ],
        "array-bracket-newline": [
            "error",
            "consistent"
        ],
        "array-bracket-spacing": [
            "error",
            "never"
        ],
        "no-console": "error",
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1,
                "ArrayExpression": "first"
            }
        ],

    }
};
