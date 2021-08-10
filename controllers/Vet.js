const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Vet = require('../model/Vet');
const Clinic = require('../model/Clinic');

// @description: get vets
// @route: GET /vets
// @route: GET /vets/:clinicId
// @access: public
exports.getVets = asyncHandler(async (req, res, next) => {
  if (req.params.clinicId) {
    const vets = await Vet.find({ clinic: req.params.clinicId });

    return res.status(200).json({
      success: true,
      count: vets.length,
      data: vets
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @description: get single vet
// @route: GET /vet/:id
// @access: public
exports.getVet = asyncHandler(async (req, res, next) => {
  const vet = await Vet.findById(req.params.id);

  if (!vet) {
    return next(new ErrorResponse(`No vet with the id of ${req.params.id}`), 404);
  }

  res.status(200).json({
    success: true,
    data: vet
  });
});

// @description: add vet
// @route: POST /vet/:clinicId/create
// @access: private
exports.createVet = asyncHandler(async (req, res, next) => {
  req.body.clinic = req.params.clinicId;

  const clinic = await Clinic.findById(req.params.clinicId);

  if (!clinic) {
    return next(new ErrorResponse(`No clinic with the id of ${req.params.clinicId}`), 404);
  }

  // Make sure user is clinic owner
  if (clinic.user.toString() !== req.user.id && req.user.role !== 'clinicOwner') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to add a vet to clinic ${clinic._id}`, 401));
  }

  const vet = await Vet.create(req.body);

  res.status(200).json({
    success: true,
    data: vet
  });
});

// @description: update vet
// @route: PUT /vet/:id/update
// @access: private
exports.updateVet = asyncHandler(async (req, res, next) => {
  let vet = await Vet.findById(req.params.id);

  if (!vet) {
    return next(new ErrorResponse(`No vet with the id of ${req.params.id}`), 404);
  }

  const clinic = await Clinic.findById(vet.clinic);

  // Make sure user is clinic owner
  if (clinic.user.toString() !== req.user.id && req.user.role !== 'clinicOwner') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update vet ${vet._id}`, 401));
  }

  vet = await Vet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: vet
  });
});

// @description: delete vet
// @route: DELETE /vet/:id/delete
// @access: private
exports.deleteVet = asyncHandler(async (req, res, next) => {
  const vet = await Vet.findById(req.params.id);

  if (!vet) {
    return next(new ErrorResponse(`No vet with the id of ${req.params.id}`), 404);
  }

  const clinic = await Clinic.findById(vet.clinic);

  // Make sure user is clinic owner
  if (clinic.user.toString() !== req.user.id && req.user.role !== 'clinicOwner') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete vet ${vet._id}`, 401));
  }

  await vet.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
