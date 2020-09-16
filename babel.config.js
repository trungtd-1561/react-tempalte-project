module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          browsers: [
            'last 2 Chrome versions',
            'last 2 Safari versions',
            'last 2 iOS versions',
            'last 2 Android versions',
            'last 2 ChromeAndroid versions',
            'last 2 Edge versions',
          ],
        },
      },
    ],
    '@babel/flow',
    '@babel/react',
  ],
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-private-methods',
    '@babel/syntax-bigint',
    '@babel/syntax-dynamic-import',
    '@babel/syntax-import-meta',
    'dynamic-import-webpack',
    ['module-resolver', { root: './app' }],
    'polished',
    'react-intl',
    'styled-components',
  ],
  env: {
    production: {
      only: ['app'],
      plugins: [
        'lodash',
        'transform-react-remove-prop-types',
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements',
      ],
    },
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        'dynamic-import-node',
      ],
    },
  },
};
