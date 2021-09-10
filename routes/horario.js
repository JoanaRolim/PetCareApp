const express = require('express');
const Horario = require('../model/Horario');
const { getHorarios, getHorario, createHorario, updateHorario, deleteHorario } = require('../controllers/Horario');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

router.route('/').get(advancedResults(Horario), getHorarios);

router.post('/', protect, createHorario);

router.route('/:id').get(getHorario).put(protect, updateHorario).delete(protect, deleteHorario);

module.exports = router;
