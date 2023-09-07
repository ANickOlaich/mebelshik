//Делает картинку по RAL
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const axios = require('axios');
const router = require('express').Router();


// Все типы
router.get('/:ral', async (req, res) => {
    const url = 'https://rgb.to/save/json/ral/' + req.params.ral;
  
    try {
      const response = await axios.get(url);
      const html = response.data;
      const name = await createfile(req.params.ral, html.hex);
      console.log(name);
      res.status(200).json({
            fileURL:name
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  function createfile(ral, color) {
    return new Promise((resolve, reject) => {
      const width = 300;
      const height = 300;
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, width, height);
  
      const filename = '/images/ral/ral' + ral + '.png';
      const output = fs.createWriteStream('public'+filename);
      const stream = canvas.createPNGStream();
  
      stream.pipe(output);
  
      output.on('finish', () => {
        console.log('Изображение сохранено.');
        resolve(filename);
      });
  
      output.on('error', (err) => {
        console.error('Ошибка при сохранении изображения:', err);
        reject(err);
      });
    });
  }

module.exports = router;