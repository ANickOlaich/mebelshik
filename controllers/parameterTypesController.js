// controllers/parameterTypesController.js
const { ParameterType } = require('../models');

exports.getAllParameterTypes = async (req, res) => {
  try {
    const parameterTypes = await ParameterType.findAll();
    res.json(parameterTypes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createParameterType = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newType = await ParameterType.create({ name, description });
    res.json(newType);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateParameterType = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const { name, description } = req.body;
    console.log(name);
    const updatedType = await ParameterType.update(
      { name, description },
      { where: { id }, returning: true, plain: true }
    );
    res.json(updatedType[1]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteParameterType = async (req, res) => {
  try {
    const { id } = req.params;
    await ParameterType.destroy({ where: { id } });
    res.json({ message: 'Parameter type deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
