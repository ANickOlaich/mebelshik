// routes/photoRoutes.js
const express = require('express');
const router = express.Router();
const photoController = require('../../controllers/photoControllers');

// Загрузка фото
router.post('/', photoController.uploadPhoto);


// Удаление фото
router.delete('/:id', photoController.deletePhoto);

// Получение всех фото
router.get('/', photoController.getAllPhotos);

// Получение фото по проекту
router.get('/project/:projectId', photoController.getPhotosByProject);

// Обновление описания фото
router.put('/:id/update-description', photoController.updatePhotoDescription);

module.exports = router;
