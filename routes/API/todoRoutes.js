// routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const {
  getTodosByProject,
  createTodo,
  updateTodo,
  deleteTodo
} = require('../../controllers/todoController');

// Получить задачи по проекту
router.get('/projects/:projectId/todos', getTodosByProject);

// Создать новую задачу
router.post('/projects/:projectId/todos', createTodo);

// Обновить задачу
router.put('/:todoId', updateTodo);

// Удалить задачу
router.delete('/:todoId', deleteTodo);

module.exports = router;
