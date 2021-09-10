const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../model/User');
const Pet = require('../model/Pet');

// @description: get pets
// @route: GET /pets
// @route: GET /user/:userId/pets
// @access: public
exports.getPets = asyncHandler(async (req, res, next) => {
  if (req.params.userId) {
    const pets = await Pet.find({ user: req.params.userId });

    return res.status(200).json({
      success: true,
      count: pets.length,
      data: pets
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @description: get single pet
// @route: GET /pet/:id
// @access: public
exports.getPet = asyncHandler(async (req, res, next) => {
  const pet = await Pet.findById(req.params.id);

  if (!pet) {
    return next(new ErrorResponse(`Pet not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: pet
  });
});

// @description: create pet
// @route: POST /pet/create
// @access: private
exports.createPet = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const pet = await Pet.create(req.body);

  res.status(201).json({
    success: true,
    data: pet
  });
});

// @description: update pet
// @route: PUT /pet/:id/update
// @access: private
exports.updatePet = asyncHandler(async (req, res, next) => {
  let pet = await Pet.findById(req.params.id);

  if (!pet) {
    return next(new ErrorResponse(`Pet not found with id of ${req.params.id}`, 404));
  }

  // Make sure pet belongs to user
  if (pet.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.params.id} is not authorized to update this Pet`, 401));
  }

  pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: pet
  });
});

// @description: delete pet
// @route: PUT /pet/:id/delete
// @access: private
exports.deletePet = asyncHandler(async (req, res, next) => {
  const pet = await Pet.findById(req.params.id);

  if (!pet) {
    return next(new ErrorResponse(`Pet not found with id of ${req.params.id}`, 404));
  }

  // Make sure pet belongs to user
  if (pet.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.params.id} is not authorized to delete this Pet`, 401));
  }

  pet.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
