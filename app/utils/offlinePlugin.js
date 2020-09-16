import loglevel from 'utils/loglevel';

/* istanbul ignore next: production environment */
(async () => {
  if (process.env.NODE_ENV === 'production') {
    try {
      (await import('offline-plugin/runtime')).install();
    } catch (error) {
      loglevel.error(error.stack);
    }
  }
})();
