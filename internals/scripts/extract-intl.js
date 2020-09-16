require('shelljs/global');
const fs = require('fs');
const nodeGlob = require('glob');
const { transform } = require('@babel/core');
const get = require('lodash/get');
const animateProgress = require('./helpers/progress');
const addCheckmark = require('./helpers/checkmark');
const { appLocales, DEFAULT_LOCALE } = require('../../app/i18n');
const babel = require('../../babel.config.js');

const { presets } = babel;
let plugins = babel.plugins || [];
if (!plugins.includes('react-intl')) {
  plugins.push('react-intl');
}
plugins = plugins.filter(p => p !== 'styled-components');
const FILES_TO_PARSE = 'app/**/!(*.test).js';
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
const readFile = fileName =>
  new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (error, value) =>
      error ? reject(error) : resolve(value),
    );
  });
const oldLocaleMappings = [];
const localeMappings = [];
for (const locale of appLocales) {
  oldLocaleMappings[locale] = {};
  localeMappings[locale] = {};
  const translationFileName = `app/translations/${locale}.json`;
  try {
    const messages = JSON.parse(fs.readFileSync(translationFileName));
    const messageKeys = Object.keys(messages);
    for (const messageKey of messageKeys) {
      oldLocaleMappings[locale][messageKey] = messages[messageKey];
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      process.stderr.write(
        `There was an error loading this translation file: ${translationFileName}
        \n${error}`,
      );
    }
  }
}
const extractFromFile = async filename => {
  try {
    const code = await readFile(filename);
    const output = await transform(code, { filename, presets, plugins });
    const messages = get(output, 'metadata.react-intl.messages', []);
    for (const message of messages) {
      for (const locale of appLocales) {
        const oldLocaleMapping = oldLocaleMappings[locale][message.id];
        const newMsg = locale === DEFAULT_LOCALE ? message.defaultMessage : '';
        localeMappings[locale][message.id] = oldLocaleMapping || newMsg;
      }
    }
  } catch (error) {
    process.stderr.write(`\nError transforming file: ${filename}\n${error}\n`);
  }
};
const memoryTask = glob(FILES_TO_PARSE);
const memoryTaskDone = task('Storing language files in memory');
memoryTask.then(files => {
  memoryTaskDone();
  const extractTask = Promise.all(
    files.map(fileName => extractFromFile(fileName)),
  );
  const extractTaskDone = task('Run extraction on all files');
  extractTask.then(() => {
    extractTaskDone();
    mkdir('-p', 'app/translations');
    let localeTaskDone;
    let translationFileName;
    for (const locale of appLocales) {
      translationFileName = `app/translations/${locale}.json`;
      localeTaskDone = task(
        `Writing translation messages for ${locale} to: ${translationFileName}`,
      );
      const messages = {};
      Object.keys(localeMappings[locale])
        .sort()
        .forEach(key => {
          messages[key] = localeMappings[locale][key];
        });
      const prettified = `${JSON.stringify(messages, null, 2)}\n`;
      try {
        fs.writeFileSync(translationFileName, prettified);
        localeTaskDone();
      } catch (error) {
        localeTaskDone(
          `There was an error saving this translation file: ${translationFileName}
          \n${error}`,
        );
      }
    }
    process.exit();
  });
});
