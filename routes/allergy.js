const express = require('express');
const router = express.Router();
const Allergy = require('../model/Allergy');

const { getAllergies, getAllergy, createAllergy, updateAllergy, deleteAllergy } = require('../controllers/Allergy');

const advancedResults = require('../middleware/advancedResults');

router.route('/').get(advancedResults(Allergy), getAllergies);

router.route('/:id').get(getAllergy);

router.route('/create').post(createAllergy);

router.route('/:id/update').put(updateAllergy);

router.route('/:id/delete').delete(deleteAllergy);

module.exports = router;
