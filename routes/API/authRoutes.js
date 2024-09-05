const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { User } = require('../../models'); // Замените на путь к вашей модели User

const router = express.Router();
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;


// Страница регистрации
router.get('/register', (req, res) => {
  res.render('register', { errors: [] }); // Передаем пустой массив ошибок
});

// Регистрация пользователя
router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('register', { errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // Проверка, существует ли пользователь
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.render('register', { errors: [{ msg: 'User already exists' }] });
    }

    // Хэширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = 'user';
    // Создание нового пользователя
    user = await User.create({ name, email, password: hashedPassword,role });

    res.redirect('/login'); // Перенаправление на страницу входа после успешной регистрации
  } catch (error) {
    console.log(error);
    res.status(500).render('register', { errors: [{ msg: 'Server error' }] });
  }
});


// Вход пользователя
router.post('/login', [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('register', { errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.render('register', { errors: errors.array() });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('register', { errors: errors.array() });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });

    // Сохраняем токен в куки
    res.cookie('token', token, { httpOnly: true, maxAge: 86400000 }); // 1 день
    res.redirect('/dashboard'); // Перенаправление на страницу личного кабинета
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Добавляем маршрут выхода
router.get('/logout', (req, res) => {
  res.clearCookie('token'); // Удаляем JWT токен из cookies
  res.redirect('/login'); // Перенаправляем пользователя на страницу входа
});

module.exports = router;
