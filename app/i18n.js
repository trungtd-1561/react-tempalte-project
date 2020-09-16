// @noflow

// This file is used by `internals/scripts/extract-intl.js` without Babel, need
// to use CommonJS module syntax.

const enTranslationMessages = require('./translations/en.json');
const jaTranslationMessages = require('./translations/ja.json');

/* eslint-disable global-require */
if (!Intl.PluralRules) {
  require('@formatjs/intl-pluralrules/polyfill');
  require('@formatjs/intl-pluralrules/dist/locale-data/ja');
}
if (!Intl.RelativeTimeFormat) {
  require('@formatjs/intl-relativetimeformat/polyfill');
  require('@formatjs/intl-relativetimeformat/dist/locale-data/ja');
}
/* eslint-enable global-require */
const DEFAULT_LOCALE = 'ja';
const appLocales = ['en', 'ja'];
const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, jaTranslationMessages)
      : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};
const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  ja: formatTranslationMessages('ja', jaTranslationMessages),
};

module.exports = {
  DEFAULT_LOCALE,
  appLocales,
  formatTranslationMessages,
  translationMessages,
};
