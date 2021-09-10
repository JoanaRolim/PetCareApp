const path = require('path');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const Vaccine = require('../../model/Vaccine');

// @description: get all vaccines
// @route: GET /vaccine
// @access: public
exports.getVaccines = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @description: get single vaccine
// @route: GET /vaccine/:id
// @access: public
exports.getVaccine = asyncHandler(async (req, res, next) => {
  const vaccine = await Vaccine.findById(req.params.id);

  if (!vaccine) {
    return next(new ErrorResponse(`Vaccine not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: vaccine
  });
});

// @description: create vaccine
// @route: POST /vaccine/create
// @access: private
exports.createVaccine = asyncHandler(async (req, res, next) => {
  const vaccine = await Vaccine.create(req.body);

  res.status(201).json({
    success: true,
    data: vaccine
  });
});

// @description: update vaccine
// @route: UPDATE /vaccine/:id/update
// @access: private
exports.updateVaccine = asyncHandler(async (req, res, next) => {
  let vaccine = await Vaccine.findById(req.params.id);

  if (!vaccine) {
    return next(new ErrorResponse(`Vaccine not found with id of ${req.params.id}`, 404));
  }

  vaccine = await Vaccine.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: vaccine
  });
});

// @description: delete vaccine
// @route: DELETE /vaccine/:id/delete
// @access: private
exports.deleteVaccine = asyncHandler(async (req, res, next) => {
  const vaccine = await Vaccine.findById(req.params.id);

  if (!vaccine) {
    return next(new ErrorResponse(`Vaccine not found with id of ${req.params.id}`, 404));
  }

  vaccine.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
