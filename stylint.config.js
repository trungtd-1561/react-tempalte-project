module.exports = {
  rules: { 'prettier/prettier': [true, { parser: 'css' }] },
  extends: [
    'stylelint-config-standard',
    'stylelint-config-styled-components',
    'stylelint-prettier/recommended',
  ],
  plugins: ['stylelint-prettier'],
  processors: ['stylelint-processor-styled-components'],
};
