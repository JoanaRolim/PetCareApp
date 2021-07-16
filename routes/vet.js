const express = require('express');
const router = express.Router();

const Vet = require('../model/Vet');

const { getVets, getVet, createVet, updateVet, deleteVet } = require('../controllers/Vet');

const { protect } = require('../middleware/auth');

const advancedResults = require('../middleware/advancedResults');

router.route('/:clinicId').get(advancedResults(Vet), getVets);

router.route('/:id').get(getVet);

router.post('/:clinicId/create', protect, createVet);

router.put('/:id/update', protect, updateVet);

router.delete('/:id/delete', protect, deleteVet);

module.exports = router;
