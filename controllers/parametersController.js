const { Parameter, ParameterType } = require('../models');

// Получить все параметры
exports.getAllParameters = async (req, res) => {
  try {
    console.log('ALL PARAMETERS');
    const parameters = await Parameter.findAll({ include: ParameterType });
    console.log(parameters);
    res.json(parameters);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Создать параметр
exports.createParameter = async (req, res) => {
  try {
    console.log(req.body);
    const author = req.user.id;
    const { name, isGlobal, typeId } = req.body;
    const newParameter = await Parameter.create({ name, author, isGlobal, typeId });
    res.json(newParameter);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Обновить параметр
exports.updateParameter = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, author, isGlobal, typeId } = req.body;
    const parameter = await Parameter.findByPk(id);
    if (!parameter) {
      return res.status(404).json({ message: 'Parameter not found' });
    }
    await parameter.update({ name, author, isGlobal, typeId });
    res.json(parameter);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Удалить параметр
exports.deleteParameter = async (req, res) => {
  try {
    const { id } = req.params;
    const parameter = await Parameter.findByPk(id);
    if (!parameter) {
      return res.status(404).json({ message: 'Parameter not found' });
    }
    await parameter.destroy();
    res.json({ message: 'Parameter deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
