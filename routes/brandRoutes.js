const express = require('express');
const router = express.Router();
const controller = require('../controllers/brandController');

router.post('/', controller.createBrand);
router.get('/', controller.getBrands);
router.get('/summary', controller.getSummary);
router.get('/:id', controller.getBrandById);
router.patch('/:id/status', controller.updateStatus);
router.post('/:id/notes', controller.addNote);

module.exports = router;