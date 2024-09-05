// controllers/sizeController.js

const { Size, Project } = require('../models');

// Создать размер
exports.createSize = async (req, res) => {
  try {
    const { sizeName, dimension, projectId } = req.body;

    // Проверка существования проекта
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Проект не найден' });
    }

    // Создание размера
    const newSize = await Size.create({
      sizeName,
      dimension,
      projectId
    });

    res.status(201).json(newSize);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Удалить размер
exports.deleteSize = async (req, res) => {
  try {
    const { id } = req.params;

    const size = await Size.findByPk(id);
    if (!size) {
      return res.status(404).json({ error: 'Размер не найден' });
    }

    await size.destroy();
    res.status(200).json({ message: 'Размер успешно удалён' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Изменить размер
exports.updateSize = async (req, res) => {
  try {
    const { id } = req.params;
    const { sizeName, dimension } = req.body;

    const size = await Size.findByPk(id);
    if (!size) {
      return res.status(404).json({ error: 'Размер не найден' });
    }

    size.sizeName = sizeName || size.sizeName;
    size.dimension = dimension || size.dimension;
    await size.save();

    res.status(200).json(size);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получить все размеры в проекте
exports.getSizesByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Ищем все записи в модели Size, у которых projectId совпадает с переданным
    const sizes = await Size.findAll({
      where: { projectId: projectId }
    });
    return sizes;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получить все имена размеров
exports.getAllSizeNames = async (req, res) => {
  try {
    const sizes = await Size.findAll({
      attributes: ['sizeName'],
      group: ['sizeName']
    });

    const sizeNames = sizes.map(size => size.sizeName);
    return sizeNames;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
