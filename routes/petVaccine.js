const express = require('express');
const { getPetVaccines, getPetVaccine, createPetVaccine, updatePetVaccine, deletePetVaccine } = require('../controllers/PetVaccine');

const PetVaccine = require('../model/PetVaccine');
const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

router.route('/').get(advancedResults(PetVaccine), getPetVaccines);

router.route('/:petId').post(protect, createPetVaccine);

router.route('/:id').get(getPetVaccine).put(protect, updatePetVaccine).delete(protect, deletePetVaccine);

module.exports = router;
