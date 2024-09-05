const express = require('express');
const router = express.Router();
const parametersController = require('../../controllers/parametersController');
const authenticateUser = require('../../middleware/authenticateUser')

// Получить все параметры
router.get('/', parametersController.getAllParameters);

// Создать параметр
router.post('/',authenticateUser, parametersController.createParameter);

// Обновить параметр
router.put('/:id',authenticateUser, parametersController.updateParameter);

// Удалить параметр
router.delete('/:id',authenticateUser, parametersController.deleteParameter);

module.exports = router;
