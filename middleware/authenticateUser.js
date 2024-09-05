const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET; // Секретный ключ для JWT

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers['authorization']; // Используем headers['authorization'] для получения заголовка
  console.log(req.headers);
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.replace('Bearer ', '');
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.user = user; // Добавляем пользователя в объект запроса
    next();
  } catch (error) {
    console.error('JWT Error:', error);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authenticateUser;
