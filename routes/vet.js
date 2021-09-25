const express = require('express');
const Vet = require('../model/Vet');
const { getVets, getVet, createVet, updateVet, deleteVet } = require('../controllers/Vet');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

router.route('/').get(advancedResults(Vet), getVets);

router.post('/:clinicId', protect, createVet);

router.route('/:id').get(getVet).put(protect, updateVet).delete(protect, deleteVet);

module.exports = router;
