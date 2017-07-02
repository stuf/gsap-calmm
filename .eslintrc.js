module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "arrow-parens": 0,
        "indent": 0,
        "no-underscore-dangle": 0,
        "spaced-comment": 0,
        "react/jsx-wrap-multilines": 0,
        "react/jsx-filename-extension": 0,
        "react/jsx-indent": 0,
        "react/jsx-indent-props": 0,
        "react/jsx-first-prop-new-line": 0,
        "react/jsx-closing-bracket-location": 0,
        "react/require-default-props": 0,
        "react/forbid-prop-types": 0,
        "react/jsx-uses-react": 0,
        "react/jsx-uses-vars": 0
    }
};