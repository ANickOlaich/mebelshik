const express = require('express');
const { User } = require('../../models'); // Убедитесь, что путь правильный
const authMiddleware = require('../../middleware/authMiddleware'); // Путь к middleware

const router = express.Router();

// Страница личного кабинета
router.get('/', authMiddleware, async (req, res) => {
  if (!req.isAuthenticated) {
    return res.redirect('/login'); // Перенаправление на страницу входа, если пользователь не аутентифицирован
  }

  try {
    // Находим пользователя по ID из токена
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Рендерим страницу личного кабинета и передаем данные о пользователе
    res.render('dashboard', { user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
