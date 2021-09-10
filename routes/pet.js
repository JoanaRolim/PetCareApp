const express = require('express');
const Pet = require('../model/Pet');

const petVaccineRouter = require('./petVaccine');
const petAllergyRouter = require('./petAllergy');
const agendamentoRouter = require('./agendamento');

const { getPets, getPet, createPet, updatePet, deletePet } = require('../controllers/Pet');
const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/auth');

const advancedResults = require('../middleware/advancedResults');

router.use('/:petId/petvaccines', petVaccineRouter);
router.use('/:petId/petallergy', petAllergyRouter);
router.use('/:petId/agendamentos', agendamentoRouter);

router.get('/', advancedResults(Pet), getPets);

router.route('/:id').get(getPet);

router.post('/create', protect, createPet);

router.put('/:id/update', protect, updatePet);

router.delete('/:id/delete', protect, deletePet);

module.exports = router;
