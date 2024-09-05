const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');

// Маршрут для генерации PDF по проекту
router.get('/:projectId', pdfController.generatePDF);

module.exports = router;
