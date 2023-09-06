const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async function scrapeData(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    
    const data = {
      description: $('h1').text(),
      price: $('span.ty-price-num').text(),
      imageSrc: $('a.cm-image-previewer').attr('href'),
      sku: $('span.ty-control-group__item[id^="product_code_"]').text(),
      url: url,
      provider:'Owwa',
      
    };
    return data;
  } catch (error) {
    throw new Error('Ошибка при загрузке страницы: ' + error.message);
  }
};