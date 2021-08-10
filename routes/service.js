const express = require('express');
const { getServices, getService, createService, updateService, deleteService } = require('../controllers/Service');

const Service = require('../model/Service');
const router = express.Router({ mergeParams: true });

const vetServiceRouter = require('./vetService');

const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

router.route('/').get(advancedResults(Service), getServices);

router.use('/:serviceId/vetservices', vetServiceRouter);

router.route('/').post(protect, createService);

router.route('/:id').get(getService).put(protect, updateService).delete(protect, deleteService);

module.exports = router;
