import FontFaceObserver from 'fontfaceobserver';
import loglevel from 'utils/loglevel';

/* istanbul ignore next: requires pre-import setup */
(async () => {
  const fontFaceObserver = new FontFaceObserver('Open Sans', {});
  const { classList } = window.document.body;
  try {
    await fontFaceObserver.load();
    classList.add('fontLoaded');
  } catch (error) {
    loglevel.error(error.stack);
    classList.remove('fontLoaded');
  }
})();
