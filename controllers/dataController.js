const db = require('../models');

exports.getData = async (req, res) => {
  try {
    const data = await db.Data.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createData = async (req, res) => {
  try {
    const { name } = req.body;
    const newData = await db.Data.create({ name });
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
