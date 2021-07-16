const express = require('express');
const Pet = require('../model/Pet');
const reviewRouter = require('./review');

const { getPets, getPet, createPet, updatePet, deletePet } = require('../controllers/Pet');
const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/auth');

const advancedResults = require('../middleware/advancedResults');

router.get('/', advancedResults(Pet), getPets);

router.route('/:id').get(getPet);

router.post('/create', protect, createPet);

router.put('/:id/update', protect, updatePet);

router.delete('/:id/delete', protect, deletePet);

module.exports = router;
