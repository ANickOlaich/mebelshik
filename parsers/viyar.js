const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async function scrapeData(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const data = {
      description: $('h1').text(),
      price: $('span.product-price__cost').text(),
      imageSrc: 'https://viyar.ua' + $('img.product-slider__img').attr('src'),
      sku: $('sup.product__title-sup').text().trim().match(/\d+/),
      url: url,
      provider:'Вияр',
      
    };

    return data;
  } catch (error) {
    throw new Error('Ошибка при загрузке страницы: ' + error.message);
  }
};