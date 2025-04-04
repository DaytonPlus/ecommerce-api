const path = require('path');
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');
const fs = require('fs');

const projectRoot = path.resolve(__dirname, '../../');
const langsPath = path.join(projectRoot, 'locales/langs.json');
const langsData = JSON.parse(fs.readFileSync(langsPath, 'utf8'));

console.log(langsData.supportedLngs)

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    backend: {
      loadPath: path.join(projectRoot, 'locales/{{lng}}.json'),
    },
    fallbackLng: 'es',
    supportedLngs: langsData.supportedLngs,
    detection: {
      lookupHeader: 'accept-language',
      lookupQuerystring: 'lang',
      lookupCookie: 'i18next',
    },
    interpolation: {
      escapeValue: false,
    },
  });

module.exports = { i18next, middleware, langNames: langsData.langNames };