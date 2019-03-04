const IntlPolyfill = require("intl");
Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

const { readFileSync } = require("fs");
const { basename } = require("path");
const { createServer } = require("http");
const { parse } = require("url");
const accepts = require("accepts");
const glob = require("glob");
const next = require("next");
const mobxReact = require("mobx-react");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const languages = glob.sync("./lang/*.json").map(f => basename(f, ".json"));

const localeDataCache = new Map();

const getLocaleDataScript = locale => {
  const lang = locale.split("-")[0];
  if (!localeDataCache.has(lang)) {
    const localeDataFile = require.resolve(`react-intl/locale-data/${lang}`);
    const localeDataScript = readFileSync(localeDataFile, "utf8");
    localeDataCache.set(lang, localeDataScript);
  }
  return localeDataCache.get(lang);
};
const getMessages = locale => {
  return require(`./lang/${locale}.json`);
};

mobxReact.useStaticRendering(true);

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const accept = accepts(req);
    let locale = accept.language(languages);
    locale = locale || "en";
    req.locale = locale;
    req.localeDataScript = getLocaleDataScript(locale);
    req.messages = getMessages(locale);
    handle(req, res, parsedUrl);
  }).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
