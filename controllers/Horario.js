const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Horario = require('../model/Horario');
const Clinic = require('../model/Clinic');

// @description: get Horarios
// @route: GET /horario
// @route: GET /:clinicId/horarios
// @access: public
exports.getHorarios = asyncHandler(async (req, res, next) => {
  if (req.params.clinicId) {
    const Horarios = await Horario.find({ clinic: req.params.clinicId });

    return res.status(200).json({
      success: true,
      count: Horarios.length,
      data: Horarios
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @description: get single Horario
// @route: GET /Horario/:id
// @access: public
exports.getHorario = asyncHandler(async (req, res, next) => {
  const Horario = await Horario.findById(req.params.id);

  if (!Horario) {
    return next(new ErrorResponse(`No Horario with the id of ${req.params.id}`), 404);
  }

  res.status(200).json({
    success: true,
    data: Horario
  });
});

// @description: add Horario
// @route: POST /Horario/:clinicId/create
// @access: private
exports.createHorario = asyncHandler(async (req, res, next) => {
  req.body.clinic = req.params.clinicId;

  const clinic = await Clinic.findById(req.params.clinicId);

  if (!clinic) {
    return next(new ErrorResponse(`No clinic with the id of ${req.params.clinicId}`), 404);
  }

  // Make sure user is clinic owner
  if (clinic.user.toString() !== req.user.id && req.user.role !== 'clinicOwner') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to add a Horario to clinic ${clinic._id}`, 401));
  }

  const horario = await Horario.create(req.body);

  res.status(200).json({
    success: true,
    data: horario
  });
});

// @description: update Horario
// @route: PUT /Horario/:id/update
// @access: private
exports.updateHorario = asyncHandler(async (req, res, next) => {
  let Horario = await Horario.findById(req.params.id);

  if (!Horario) {
    return next(new ErrorResponse(`No Horario with the id of ${req.params.id}`), 404);
  }

  const clinic = await Clinic.findById(Horario.clinic);

  // Make sure user is clinic owner
  if (clinic.user.toString() !== req.user.id && req.user.role !== 'clinicOwner') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update Horario ${Horario._id}`, 401));
  }

  Horario = await Horario.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: Horario
  });
});

// @description: delete Horario
// @route: DELETE /Horario/:id/delete
// @access: private
exports.deleteHorario = asyncHandler(async (req, res, next) => {
  const Horario = await Horario.findById(req.params.id);

  if (!Horario) {
    return next(new ErrorResponse(`No Horario with the id of ${req.params.id}`), 404);
  }

  const clinic = await Clinic.findById(Horario.clinic);

  // Make sure user is clinic owner
  if (clinic.user.toString() !== req.user.id && req.user.role !== 'clinicOwner') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete Horario ${Horario._id}`, 401));
  }

  await Horario.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
