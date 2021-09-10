const express = require('express');
const router = express.Router();

const Admin = require('../model/admLogin');

const { getAdmins, getAdmin, createAdmin, updateAdmin, deleteAdmin } = require('../controllers/admin/AdmLogin');

const advancedResults = require('../middleware/advancedResults');

router.route('/').get(advancedResults(Admin), getAdmins);

router.route('/:id').get(getAdmin);

router.route('/create').post(createAdmin);

router.route('/:id/update').put(updateAdmin);

router.route('/:id/delete').delete(deleteAdmin);

module.exports = router;
