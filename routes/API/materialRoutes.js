// routes/materialRoutes.js

const express = require('express');
const materialController = require('../../controllers/materialController');
const router = express.Router();

// Маршруты для материалов
router.post('/', materialController.addMaterial);
router.delete('/:id', materialController.deleteMaterial);
router.put('/:id', materialController.updateMaterial);
router.get('/', materialController.getAllMaterials);
router.get('/names', materialController.getAllMaterialNames);
router.get('/check', materialController.checkMaterialExists);
router.post('/parse-material', materialController.parseMaterialData);
router.get('/:id',materialController.getMaterial);

module.exports = router;
