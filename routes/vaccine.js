const express = require('express');
const router = express.Router();
const Vaccine = require('../model/Vaccine');

const { getVaccines, getVaccine, createVaccine, updateVaccine, deleteVaccine } = require('../controllers/Vaccine');

const advancedResults = require('../middleware/advancedResults');

router.route('/').get(advancedResults(Vaccine), getVaccines);

router.route('/:id').get(getVaccine);

router.route('/create').post(createVaccine);

router.route('/:id/update').put(updateVaccine);

router.route('/:id/delete').delete(deleteVaccine);

module.exports = router;
