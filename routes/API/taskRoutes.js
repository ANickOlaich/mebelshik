// routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const taskController = require('../../controllers/taskController');
const authMiddleware = require('../../middleware/authMiddleware');

// GET /api/tasks?page=1&limit=10
router.get('/', authMiddleware, taskController.getTasksPaginated);

// GET /api/tasks/project/:projectId
router.get('/project/:projectId', authMiddleware, taskController.getTasksByProjectId);

// POST /api/tasks
router.post('/', authMiddleware, taskController.createTask);

// GET /api/tasks/:id
router.get('/:id', authMiddleware, taskController.getTaskById);

// PUT /api/tasks/:id
router.put('/:id', authMiddleware, taskController.updateTask);

// DELETE /api/tasks/:id
router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;
