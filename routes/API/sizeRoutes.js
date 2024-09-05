// routes/sizeRoutes.js
const express = require('express');
const sizeController = require('../../controllers/sizeController');
const router = express.Router();

// Создать размер
router.post('/', sizeController.createSize);

// Удалить размер
router.delete('/:id', sizeController.deleteSize);

// Изменить размер
router.put('/:id', sizeController.updateSize);

// Получить все размеры в проекте
router.get('/:projectId/sizes', sizeController.getSizesByProject);

// Получить все имена размеров
router.get('/names', sizeController.getAllSizeNames);

module.exports = router;