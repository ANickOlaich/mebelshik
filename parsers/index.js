const url = require('url');
const owwa = require('./owwa');
const kronas = require('./kronas');
const viyar = require('./viyar');

module.exports = async function scrapeData(inputUrl) {
  const parsedUrl = new URL(inputUrl);
  const websiteUrl = parsedUrl.origin;
  console.log('Адрес сайта:', websiteUrl);
  let data = {};

  if (websiteUrl === 'https://owwa.com.ua') {
    data = await owwa(inputUrl);
  } else if (websiteUrl === 'https://kronas.com.ua') {
    data = await kronas(inputUrl);
  } else if (websiteUrl === 'https://viyar.ua') {
    data = await viyar(inputUrl);
  }

  return data;
};
