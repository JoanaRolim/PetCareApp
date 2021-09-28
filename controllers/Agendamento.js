const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Pet = require('../model/Pet');
const Clinic = require('../model/Clinic');
const Horario = require('../model/Horario');
const Service = require('../model/Service');
const Agendamento = require('../model/Agendamento');

// @description: get agendamento
// @route: GET /agendamento
// @route: GET /clinic/:clinicId
// @access: public
exports.getAgendamentos = asyncHandler(async (req, res, next) => {
  if (req.params.clinicId || req.params.petId) {
    if (req.params.clinicId) {
      const agendamentos = await Agendamento.find({ clinic: req.params.clinicId }).populate({
        path: 'service',
        select: 'name'
      }).populate({
        path: 'clinic',
        select: 'name'
      });

      return res.status(200).json({
        success: true,
        count: agendamentos.length,
        data: agendamentos
      });
    }
    if (req.params.petId) {
      const agendamentos = await Agendamento.find({ pet: req.params.petId }).populate({
        path: 'service',
        select: 'name'
      }).populate({
        path: 'clinic',
        select: 'name'
      });

      return res.status(200).json({
        success: true,
        count: agendamentos.length,
        data: agendamentos
      });
    }
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @description: get single vet
// @route: GET /agendamento/:id
// @access: public
exports.getAgendamento = asyncHandler(async (req, res, next) => {
  const agendamento = await Agendamento.findById(req.params.id).populate({
    path: 'service',
    select: 'name'
  }).populate({
    path: 'clinic',
    select: 'name'
  });

  if (!agendamento) {
    return next(new ErrorResponse(`No vet with the id of ${req.params.id}`), 404);
  }

  res.status(200).json({
    success: true,
    data: agendamento
  });
});

// @description: add agendamento
// @route: POST /clinic/:clinicId/create
// @access: private
exports.createAgendamento = asyncHandler(async (req, res, next) => {

  const clinic = await Clinic.findById(req.body.clinic);

  if (!clinic) {
    return next(new ErrorResponse(`No clinic with the id of ${req.params.clinic}`), 404);
  }

  const agendamento = await Agendamento.create(req.body);

  res.status(200).json({
    success: true,
    data: agendamento
  });
});

// @description: update agendamento
// @route: PUT /agendamento/:id/update
// @access: private
exports.updateAgendamento = asyncHandler(async (req, res, next) => {
  let agendamento = await Agendamento.findById(req.params.id);

  if (!agendamento) {
    return next(new ErrorResponse(`No vet with the id of ${req.params.id}`), 404);
  }

  // Make sure user is agendamento owner
  if (agendamento.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update agendamento ${vet._id}`, 401));
  }

  agendamento = await Agendamento.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: agendamento
  });
});

// @description: delete agendamento
// @route: DELETE /agendamento/:id/delete
// @access: private
exports.deleteAgendamento = asyncHandler(async (req, res, next) => {
  const agendamento = await Vet.findById(req.params.id);

  if (!agendamento) {
    return next(new ErrorResponse(`No vet with the id of ${req.params.id}`), 404);
  }

  // Make sure user is agendamento owner
  if (agendamento.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete agendamento ${vet._id}`, 401));
  }

  await agendamento.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
