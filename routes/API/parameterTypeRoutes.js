// routes/parameterTypesRoutes.js
const express = require('express');
const router = express.Router();
const parameterTypesController = require('../../controllers/parameterTypesController');

router.get('/', parameterTypesController.getAllParameterTypes);
router.post('/', parameterTypesController.createParameterType);
router.put('/:id', parameterTypesController.updateParameterType);
router.delete('/:id', parameterTypesController.deleteParameterType);

module.exports = router;
