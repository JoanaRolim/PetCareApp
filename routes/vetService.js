const express = require('express');
const { getVetServices, getVetService, createVetService, updateVetService, deleteVetService } = require('../controllers/VetService');

const VetService = require('../model/VetService');
const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

router.route('/').get(advancedResults(VetService), getVetServices);

router.route('/').post(protect, createVetService);

router.route('/:id').get(getVetService).put(protect, updateVetService).delete(protect, deleteVetService);

module.exports = router;
