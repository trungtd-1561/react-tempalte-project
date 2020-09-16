/* eslint-disable no-undef */

// This file substitutes variables defined by webpack.DefinePlugin at build time
// under `window` object, to avoid ESLint no-undef / Flow errors in anywhere
// else.

/* istanbul ignore next */
(() => {
  window.Environment = Environment;
  window.APIEndpointBaseURL = APIEndpointBaseURL;
})();
