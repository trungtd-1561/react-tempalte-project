require('@babel/polyfill');
require('shelljs/global');
const fs = require('fs');
const nodeGlob = require('glob');
const path = require('path');
const { DEFAULT_LOCALE, appLocales } = require('i18n');
const animateProgress = require('./helpers/progress');
const addCheckmark = require('./helpers/checkmark');

const FILES_TO_PARSE = 'app/**/translations.js';
const newLine = () => process.stdout.write('\n');
let progress;
const task = message => {
  progress = animateProgress(message);
  process.stdout.write(message);
  return error => {
    if (error) {
      process.stderr.write(error);
    }
    clearTimeout(progress);
    return addCheckmark(() => newLine());
  };
};
const glob = pattern =>
  new Promise((resolve, reject) => {
    nodeGlob(pattern, (error, value) =>
      error ? reject(error) : resolve(value),
    );
  });
const writeFile = (fileName, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (error, value) =>
      error ? reject(error) : resolve(value),
    );
  });
const localeMappings = appLocales.reduce((mappings, locale) => {
  mappings[locale] = {};
  return mappings;
}, {});
const extractFromFile = async fileName => {
  try {
    const messages = require(path.resolve(fileName)).default;
    Object.keys(messages)
      .map(key => messages[key])
      .forEach(message => {
        if (!message.id) {
          return;
        }
        if (!(DEFAULT_LOCALE in message) && !('defaultMessage' in message)) {
          return;
        }
        for (const locale of appLocales) {
          localeMappings[locale][message.id] =
            message[locale] ||
            message[DEFAULT_LOCALE] ||
            message.defaultMessage;
        }
      });
  } catch (error) {
    console.error(`\nError transforming file: ${fileName}\n${error}`);
  }
};
(async () => {
  const memoryTaskDone = task('Storing language files in memory');
  const files = await glob(FILES_TO_PARSE);
  memoryTaskDone();
  const extractTaskDone = task('Run extraction on all files');
  try {
    await Promise.all(files.map(fileName => extractFromFile(fileName)));
  } catch (error) {
    console.warn(error);
    return process.exit(1);
  }
  extractTaskDone();
  mkdir('-p', 'app/translations');
  for (const locale of appLocales) {
    const translationFileName = `app/translations/${locale}.json`;
    const localeTaskDone = task(
      `Writing translation messages for ${locale} to: ${translationFileName}`,
    );
    try {
      let messages = {};
      Object.keys(localeMappings[locale])
        .sort()
        .forEach(function(key) {
          messages[key] = localeMappings[locale][key];
        });
      const prettified = `${JSON.stringify(messages, null, 2)}\n`;
      await writeFile(translationFileName, prettified);
      localeTaskDone();
    } catch (error) {
      localeTaskDone(
        `There was an error saving this translation file: ${translationFileName}
        \n${error}`,
      );
    }
  }
  process.exit();
})();
