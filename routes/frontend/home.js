const express = require('express');
const router = express.Router();

// Маршрут для главной страницы
router.get('/', (req, res) => {
    res.render('index', { title: 'Моя первая страница на EJS', message: 'Привет, мир!' });
  });

  module.exports = router;