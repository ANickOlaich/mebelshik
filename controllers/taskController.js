// controllers/taskController.js
const { Task, Project, Parameter, User } = require('../models');

// Получение задач с пагинацией для определенного проекта
exports.getTasksPaginated = async (req, res) => {
    try {
      const projectId = req.query.projectId;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
  
      if (!projectId) {
        return res.status(400).json({ message: 'Project ID is required' });
      }
  
      const { count, rows } = await Task.findAndCountAll({
        where: { projectId },
        include: [
          { model: Project, attributes: ['name'] },
          { model: Parameter, attributes: ['name'] },
          { model: User, attributes: ['name'] },
        ],
        limit,
        offset,
        order: [['createdAt', 'DESC']]
      });
  
      res.json({
        tasks: rows,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      });
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Создание новой задачи
exports.createTask = async (req, res) => {
  try {
    const { title, link, image, provider, status, note, projectId, parameterId, userId } = req.body;
    const newTask = await Task.create({
      title,
      link,
      image,
      provider,
      status,
      note,
      projectId,
      parameterId,
      userId,
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Получение конкретной задачи по ID
exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findOne({
      where: { id: taskId },
      include: [
        { model: Project, attributes: ['name'] },
        { model: Parameter, attributes: ['name'] },
        { model: User, attributes: ['name'] },
      ],
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Обновление задачи
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, link, image, provider, status, note, projectId, parameterId, userId } = req.body;

    const task = await Task.findOne({ where: { id: taskId } });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title;
    task.link = link;
    task.image = image;
    task.provider = provider;
    task.status = status;
    task.note = note;
    task.projectId = projectId;
    task.parameterId = parameterId;
    task.userId = userId;

    await task.save();

    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Удаление задачи
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findOne({ where: { id: taskId } });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Получение всех задач для определенного проекта
exports.getTasksByProjectId = async (req, res) => {
  const { projectId } = req.params;

  try {
    const tasks = await Task.findAll({
      where: { projectId },
      include: [
        { model: Project, attributes: ['name'] },
        { model: User, attributes: ['username'] }
      ],
    });

    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks for project:', error);
    res.status(500).json({ error: 'Failed to fetch tasks for project' });
  }
};

