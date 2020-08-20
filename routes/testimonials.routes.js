const express = require('express');
const router = express.Router();
const testimonialsController = require('../controllers/testimonials.controller');

router.get('/', testimonialsController.getAll);

router.get('/random', testimonialsController.getRandom);

router.get('/:id', testimonialsController.getId);

router.post('/', testimonialsController.postOne);

router.put('/:id', testimonialsController.putId);

router.delete('/:id', testimonialsController.deleteId);

module.exports = router;
