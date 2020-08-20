const express = require('express');
const router = express.Router();
const seatsController = require('../controllers/seats.controller');

router.get('/', seatsController.getAll);

router.get('/:id', seatsController.getId);

router.post('/', seatsController.postOne);

router.put('/:id', seatsController.putId);

router.delete('/:id', seatsController.deleteId);

module.exports = router;
