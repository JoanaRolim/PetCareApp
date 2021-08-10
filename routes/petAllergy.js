const express = require('express');
const { getPetAllergies, getPetAllergy, createPetAllergy, updatePetAllergy, deletePetAllergy } = require('../controllers/PetAllergy');

const PetAllergy = require('../model/PetAllergy');
const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

router.route('/').get(advancedResults(PetAllergy), getPetAllergies);

router.route('/').post(protect, createPetAllergy);

router.route('/:id').get(getPetAllergy).put(protect, updatePetAllergy).delete(protect, deletePetAllergy);

module.exports = router;
