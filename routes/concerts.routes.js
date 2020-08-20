const express = require('express');
const router = express.Router();
const concertsController = require('../controllers/concerts.controller');

router.get('/', concertsController.getAll);

router.get('/:id', concertsController.getId);

router.post('/', concertsController.postOne);

router.put('/:id', concertsController.putId);

router.delete('/:id', concertsController.deleteId);

module.exports = router;
