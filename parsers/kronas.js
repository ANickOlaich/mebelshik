const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async function scrapeData(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const data = {
      description: $('h1').text(),
      price: $('#price').attr('data-price'),
      imageSrc: 'https://kronas.com.ua' + $('div.productImage').attr('data-src'),
      sku: $('span[itemprop="sku"]').text(),
      url: url,
      provider:'Кронас',
      
    };

    return data;
  } catch (error) {
    throw new Error('Ошибка при загрузке страницы: ' + error.message);
  }
};