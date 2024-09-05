const express = require('express');
const router = express.Router();

// Импорт маршрутов
const authRoutes = require('./API/authRoutes');
const userRoutes = require('./API/userRoutes');
const dataRoutes = require('./API/dataRoutes');
const parameterRoutes = require('./API/parameterRoutes');
const parameterTypeRoutes = require('./API/parameterTypeRoutes');
const projectRoutes = require('./API/projectRoutes');
const taskRoutes = require('./API/taskRoutes');
const todoRoutes = require('./API/todoRoutes');
const sizeRoutes = require('./API/sizeRoutes');
const materialsRoutes = require('./API/materialRoutes');
const projectMaterialRoutes = require('./API/projectMaterialRoutes');
const photoRoutes = require('./API/photoRoutes');

// Использование маршрутов
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/data', dataRoutes);
router.use('/parameters', parameterRoutes);
router.use('/parameter-types', parameterTypeRoutes);
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);
router.use('/todos', todoRoutes);
router.use('/sizes', sizeRoutes);
router.use('/materials',materialsRoutes);
router.use('/project-materials',projectMaterialRoutes);
router.use('/photo',photoRoutes);

module.exports = router;