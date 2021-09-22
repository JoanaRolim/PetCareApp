const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../model/User');
const Clinic = require('../model/Clinic');

// @description: get all clinics
// @route: GET /clinic
// @access: public
exports.getClinics = asyncHandler(async (req, res, next) => {
  if (req.params.userId) {
    const clinics = await Clinic.find({ user: req.params.userId });

    return res.status(200).json({
      success: true,
      count: clinics.length,
      data: clinics
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @description: get single clinic
// @route: GET /clinic/:id
// @access: public
exports.getClinic = asyncHandler(async (req, res, next) => {
  const clinic = await Clinic.findById(req.params.id);

  if (!clinic) {
    return next(new ErrorResponse(`Clinic not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: clinic
  });
});

// @description: create clinic
// @route: POST /clinic/create
// @access: private
exports.createClinic = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  // If an user is not a clinicOwner, they can't add a clinic
  if (req.user.role != 'clinicOwner') {
    return next(new ErrorResponse(`O usuário de id: ${req.body.user} não possui uma conta apropriada para cadastrar uma clínica`, 400));
  }

  const clinic = await Clinic.create(req.body);

  res.status(201).json({
    success: true,
    data: clinic
  });
});

// @description: update clinic
// @route: PUT /clinic/:id/update
// @access: private
exports.updateClinic = asyncHandler(async (req, res, next) => {
  let clinic = await Clinic.findById(req.params.id);

  if (!clinic) {
    return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
  }

  // Make sure clinic belongs to user
  if (clinic.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.params.id} is not authorized to update this clinic`, 401));
  }

  clinic = await Clinic.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: clinic
  });
});

// @description: delete clinic
// @route: DELETE /clinic/:id/delete
// @access: private
exports.deleteClinic = asyncHandler(async (req, res, next) => {
  const clinic = await Clinic.findById(req.params.id);

  if (!clinic) {
    return next(new ErrorResponse(`Clinic not found with id of ${req.params.id}`, 404));
  }

  // Make sure clinic belongs to user
  if (clinic.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.params.id} is not authorized to delete this clinic`, 401));
  }

  clinic.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
