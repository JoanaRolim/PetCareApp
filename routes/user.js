const express = require('express');
const router = express.Router();

const User = require('../model/User');
const petRouter = require('./pet');

const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/admin/User');

const advancedResults = require('../middleware/advancedResults');

router.route('/').get(advancedResults(User), getUsers);

router.use('/:userId/pets', petRouter);

router.route('/:id').get(getUser);

router.route('/create').post(createUser);

router.route('/:id/update').put(updateUser);

router.route('/:id/delete').delete(deleteUser);

module.exports = router;
