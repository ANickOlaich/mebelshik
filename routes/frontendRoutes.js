const express = require('express');
const router = express.Router();

// Импорт маршрутов
const homeRoutes = require('./frontend/home');
const profileRoutes = require('./frontend/profile');
const projectsRoutes = require('./frontend/projects');
const techTaskRoutes = require('./techTask')


// Использование маршрутов
router.use('/', homeRoutes);
router.use('/dashboard',profileRoutes);
router.use('/projects',projectsRoutes);
router.use('/tech-task',techTaskRoutes);


// Страница "О нас"
router.get('/projects', (req, res) => {
    res.render('projects');
  });
  
  // Страница "Контакты"
  router.get('/contact', (req, res) => {
    res.render('contact');
  });

// Страница "Вход"
router.get('/login', (req, res) => {
    res.render('login');
  });





  
  
  // Обработка формы входа
  router.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Здесь мы отправим запрос к существующему API для аутентификации
    // Например, на http://localhost:3001/api/login
  
    // Имитация обращения к API
    
    if (username === 'admin' && password === 'password') {
      res.send('Успешный вход!');
    } else {
      res.send('Ошибка: Неверные данные!');
    }
  
    // В реальном приложении можно использовать fetch или axios для отправки данных на API
    // Пример:
    // axios.post('http://localhost:3001/api/login', { username, password })
    //   .then(response => res.send('Успешный вход!'))
    //   .catch(error => res.send('Ошибка: ' + error.message));
  });


module.exports = router;