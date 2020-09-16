import intl from 'react-intl-universal';
// flow-disable-next-line: JSON file
import en from 'translations/en.json';
// flow-disable-next-line: JSON file
import ja from 'translations/ja.json';

intl.init({ currentLocale: 'ja', locales: { en, ja } });
