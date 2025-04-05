import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import path from 'path';
import fs from 'fs';

const locales = path.join(process.cwd(), 'src', 'locales');
const langsPath = path.join(locales, 'langs.json');
const { langNames, supportedLngs } = JSON.parse(fs.readFileSync(langsPath, 'utf8'));

const initI18n = async () => {
  await i18next
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
      backend: {
        loadPath: path.join(locales, '{{lng}}.json'),
      },
      detection: {
        order: ['querystring', 'cookie'],
        caches: ['cookie'],
        lookupHeader: 'accept-language',
        lookupQuerystring: 'lang',
        lookupCookie: 'i18next',
      },
      fallbackLng: 'es',
      preload: supportedLngs,
    });

  return { i18next, middleware, langNames, supportedLngs };
};

export default initI18n;