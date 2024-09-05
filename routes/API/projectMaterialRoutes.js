const express = require('express');
const router = express.Router();
const projectMaterialController = require('../../controllers/projectMaterialController');

router.post('/', projectMaterialController.addProjectMaterial);
router.delete('/:id', projectMaterialController.deleteProjectMaterial);
router.get('/:projectId', projectMaterialController.getAllProjectMaterials);
router.get('/:projectId/names', projectMaterialController.getAllProjectMaterialNames);
router.put('/',projectMaterialController.changeMaterial)

module.exports = router;
