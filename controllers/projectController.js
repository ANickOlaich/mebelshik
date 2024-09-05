// controllers/projectController.js
const { validationResult } = require('express-validator');
const { Project,User,Todo,Size,ProjectMaterial } = require('../models');

// Получить все проекты 
exports.getAllProjects = async (req, res) => {
  try {
    return await Project.findAll(); // Возвращаем все проекты
  } catch (error) {
    console.error('Error fetching projects from database:', error);
    throw error; // Пробрасываем ошибку для обработки в роутере
  }};


// Получить все проекты пользователя
exports.getUserProjects = async (req, res) => {
  try {
    // Убедитесь, что middleware установило req.user
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = req.user.id;
    

    // Поиск проектов по userId
    const projects = await Project.findAll({
      where: { userId }, // Фильтрация проектов по userId
    });

    // Возвращаем проекты пользователя
    return projects;
  } catch (error) {
    console.error('Error fetching projects from database:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Получение проектов пользователя с пагинацией
exports.getProjectsPaginated = async (req, res) => {
    try {
      const userId = req.user.id;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
  
      const { count, rows } = await Project.findAndCountAll({
        where: { userId },
        limit,
        offset,
        order: [['createdAt', 'DESC']] // Сортировка по дате создания в порядке убывания
      });
  
      res.json({
        projects: rows,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      });
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
// Получить проект по ID
exports.getProjectById = async (req, res) => {
  const userId = req.user.id; // Предполагается, что пользователь сохраняется в req.user

  

  try {
    const project = await Project.findOne({
      where: {
        id: req.params.id,
        userId
      },
      include: [
        { model: User, 
          attributes: ['name'],
          as: 'Creator', // Используем псевдоним из ассоциации
        }] // Загрузка имени пользователя
    });

    if (!project) return res.status(404).json({ message: 'Project not found' });

    return project;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Создать новый проект
exports.createProject = async (req, res) => {
  const userId = req.user.id; // Предполагается, что пользователь сохраняется в req.user
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { name, status, isTemplate} = req.body;
  status = status || 'Новий'; // Если статус не указан, присваиваем значение "Новый"
  isTemplate = isTemplate !== undefined ? isTemplate : false; // Если isTemplate не указан, присваиваем false

  try {
    const newProject = await Project.create({ name, status, isTemplate, userId });
    res.redirect('/projects');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



exports.createProjectTemplated = async (req, res) => {
  const userId = req.user.id; // Предполагается, что пользователь сохраняется в req.user

  const { name, templateId } = req.body;
  const status = 'Новий'; // Если статус не указан, присваиваем значение "Новый"
  const isTemplate = false; // Если isTemplate не указан, присваиваем false

  try {
    // Получаем данные шаблона по templateId
    const template = await Project.findByPk(templateId);

    if (!template) {
      return res.status(404).json({ message: 'Шаблон не найден' });
    }

    // Создаем новый проект с данными из шаблона
    const newProject = await Project.create({
      name: name || template.name, // Используем имя из формы или из шаблона
      status: status,
      isTemplate: isTemplate,
      userId: userId
    });

    // Получаем все задачи (Todo) из шаблона
    const todos = await Todo.findAll({
      where: {
        projectId: templateId
      }
    });

    // Копируем задачи из шаблона в новый проект
    if (todos.length > 0) {
      await Promise.all(todos.map(async (element) => {
        await Todo.create({
          description: element.description,
          note: element.note,
          status: element.status,
          projectId: newProject.id, // Используем ID нового проекта
          userId: userId
        });
      }));
    }

    const sizes = await Size.findAll({
      where:{
        projectId: templateId
      }
    })

    if (sizes.length > 0) {
      await Promise.all(sizes.map(async (element) => {
        await Size.create({
          sizeName: element.sizeName,
          dimension: element.dimension,
          projectId: newProject.id, // Используем ID нового проекта  
        });
      }));
    }

    // Получаем все задачи (Todo) из шаблона
    const materials = await ProjectMaterial.findAll({
      where: {
        projectId: templateId
      }
    });

    // Копируем задачи из шаблона в новый проект
    if (materials.length > 0) {
      await Promise.all(materials.map(async (element) => {
        await ProjectMaterial.create({
          name:element.name,
          materialId:element.materialId,
          projectId: newProject.id, // Используем ID нового проекта
        });
      }));
    }

   

    res.redirect('/projects');
  } catch (error) {
    console.error('Ошибка при создании проекта из шаблона:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProjectStatus = async (req, res) => {
  const projectId = req.params.id;
  const { status, description } = req.body;
  console.log('========================='+description);

  try {
    const project = await Project.findByPk(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Обновление статуса
    project.status = status;
    project.description = description;
    await project.save();

    // Возвращаем успешный ответ
    res.status(200).json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating project status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProjectisTemplate = async (req, res) => {
  const projectId = req.params.id;
  const { isTemplate} = req.body;
  console.log('-----------------------');

  try {
    const project = await Project.findByPk(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Обновление статуса
    project.status = 'Шаблон';
    project.isTemplate = isTemplate;
    await project.save();

    // Возвращаем успешный ответ
    res.status(200).json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating project status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Обновить проект
exports.updateProject = async (req, res) => {
  const userId = req.user.id; // Предполагается, что пользователь сохраняется в req.user
  
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, status } = req.body;
  
  

  try {
    const project = await Project.findOne({
      where: {
        id: req.params.id,
        userId
      }
    });

    if (!project) return res.status(404).json({ message: 'Project not found' });

    project.name = name || project.name;
    project.status = status || project.status;

    await project.save();
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Удалить проект
exports.deleteProject = async (req, res) => {
  const userId = req.user.id; // Предполагается, что пользователь сохраняется в req.user

  try {
    const project = await Project.findOne({
      where: {
        id: req.params.id,
        userId
      }
    });

    if (!project) return res.status(404).json({ message: 'Project not found' });

    await project.destroy();
    res.status(204).json({ message: 'Project deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
