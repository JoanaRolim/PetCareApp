const express = require('express');
const router = express.Router();

const Clinic = require('../model/Clinic');
const reviewRouter = require('./review');
const serviceRouter = require('./service');
const vetRouter = require('./vet');

const { getClinics, getClinic, createClinic, updateClinic, deleteClinic } = require('../controllers/Clinic');

const { protect } = require('../middleware/auth');

const advancedResults = require('../middleware/advancedResults');

router.use('/:clinicId/reviews', reviewRouter);
router.use('/:clinicId/services', serviceRouter);
router.use('/:clinicId/vets', vetRouter);

router.route('/').get(advancedResults(Clinic), getClinics);

router.route('/:id').get(getClinic);

router.post('/create', protect, createClinic);

router.put('/:id/update', protect, updateClinic);

router.delete('/:id/delete', protect, deleteClinic);

module.exports = router;
