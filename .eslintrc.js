module.exports = {
    "env": {
        "es6": true
    },
    "extends": ["eslint:recommended", 'plugin:react/recommended'],
    "parser": "babel-eslint",
    "plugins": [
        "react",
        "prettier"
    ],
    "rules": {
        "prettier/prettier": "error"
    }
};