// controllers/todoController.js
const { Todo, Project, User } = require('../models');

// Получение всех задач для проекта
exports.getTodosByProject = async (req, res) => {
  const projectId = req.params.projectId;
  

  try {
    const todos = await Todo.findAll({
      where: { projectId },
      include: [User], // Подключение модели User для отображения информации о пользователе
    });
    return todos;
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Server error todos' });
  }
};

// Создание новой задачи
exports.createTodo = async (req, res) => {
  const { description, note, projectId } = req.body;
  const userId = req.user.id;
  const status = 'Новий'

  try {
    const newTodo = await Todo.create({
      description,
      note,
      status,
      projectId,
      userId,
    });
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Обновление задачи
exports.updateTodo = async (req, res) => {
  const todoId = req.params.todoId;

  try {
    const todo = await Todo.findByPk(todoId);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    if (todo.status == "Новий"){
      todo.status = 'Готово'
    }else{
      todo.status = "Новий"
    }
    await todo.save();

    res.status(200).json(todo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Удаление задачи
exports.deleteTodo = async (req, res) => {
  const todoId = req.params.todoId;

  try {
    const todo = await Todo.findByPk(todoId);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await todo.destroy();
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
