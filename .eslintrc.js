module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'plugin:jsdoc/recommended',
    'plugin:flowtype/recommended',
    'prettier/flowtype',
    'jest-enzyme',
  ],
  plugins: ['prettier', 'jsdoc', 'flowtype', 'jest'],
  env: {
    browser: true,
    jest: true,
    webextensions: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
  },
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id', '__t', '__v'] }],
    'jsdoc/require-jsdoc': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/anchor-has-content': 'off',
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './internals/webpack/webpack.prod.babel.js',
      },
    },
  },
};
