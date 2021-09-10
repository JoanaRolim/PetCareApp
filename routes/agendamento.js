const express = require('express');
const Agendamento = require('../model/Agendamento');
const { getAgendamentos, getAgendamento, createAgendamento, updateAgendamento, deleteAgendamento } = require('../controllers/Agendamento');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

router.route('/').get(advancedResults(Agendamento), getAgendamentos);

router.post('/', protect, createAgendamento);

router.route('/:id').get(getAgendamento).put(protect, updateAgendamento).delete(protect, deleteAgendamento);

module.exports = router;
