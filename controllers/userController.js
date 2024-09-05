const db = require('../models');
const bcrypt = require('bcrypt');  // Убедитесь, что этот пакет установлен

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Хэширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = 'user';
    const user = await db.User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
