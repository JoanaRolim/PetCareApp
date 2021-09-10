const path = require('path');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const Allergy = require('../../model/Allergy');

// @description: get all allergies
// @route: GET /allergy
// @access: public
exports.getAllergies = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @description: get single allergy
// @route: GET /allergy/:id
// @access: public
exports.getAllergy = asyncHandler(async (req, res, next) => {
  const allergy = await Allergy.findById(req.params.id);

  if (!allergy) {
    return next(new ErrorResponse(`Allergy not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: allergy
  });
});

// @description: create allergy
// @route: POST /allergy/create
// @access: private
exports.createAllergy = asyncHandler(async (req, res, next) => {
  const allergy = await Allergy.create(req.body);

  res.status(201).json({
    success: true,
    data: allergy
  });
});

// @description: update Allergy
// @route: UPDATE /Allergy/:id/update
// @access: private
exports.updateAllergy = asyncHandler(async (req, res, next) => {
  let allergy = await Allergy.findById(req.params.id);

  if (!allergy) {
    return next(new ErrorResponse(`Allergy not found with id of ${req.params.id}`, 404));
  }

  allergy = await Allergy.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: allergy
  });
});

// @description: delete allergy
// @route: DELETE /allergy/:id/delete
// @access: private
exports.deleteAllergy = asyncHandler(async (req, res, next) => {
  const allergy = await Allergy.findById(req.params.id);

  if (!allergy) {
    return next(new ErrorResponse(`Allergy not found with id of ${req.params.id}`, 404));
  }

  allergy.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
