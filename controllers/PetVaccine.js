const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const PetVaccine = require('../model/PetVaccine');
const Pet = require('../model/Pet');
const Vaccine = require('../model/Vaccine');

// @description: get vets
// @route: GET /
// @route: GET /:clinicId
// @access: public
exports.getPetVaccines = asyncHandler(async (req, res, next) => {
  if (req.params.petId) {
    const petVaccines = await PetVaccine.find({ pet: req.params.petId });

    return res.status(200).json({
      success: true,
      count: petVaccines.length,
      data: petVaccines
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @description: get single vet
// @route: GET /:id
// @access: public
exports.getPetVaccine = asyncHandler(async (req, res, next) => {
  const petVaccine = await PetVaccine.findById(req.params.id);

  if (!petVaccine) {
    return next(new ErrorResponse(`No pet vaccine service with the id of ${req.params.id}`), 404);
  }

  res.status(200).json({
    success: true,
    data: petVaccine
  });
});

// @description: add vet
// @route: POST /:serviceId
// @access: private
exports.createPetVaccine = asyncHandler(async (req, res, next) => {
  req.body.pet = req.params.petId;

  const pet = await Pet.findById(req.params.petId);

  // Make sure user is pet owner
  if (pet.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to add a vaccine to pet ${pet._id}`, 401));
  }

  const petVaccine = await PetVaccine.create(req.body);

  res.status(200).json({
    success: true,
    data: petVaccine
  });
});

// @description: update vet
// @route: PUT /vet/:id/update
// @access: private
exports.updatePetVaccine = asyncHandler(async (req, res, next) => {
  let petVaccine = await PetVaccine.findById(req.params.id);

  if (!petVaccine) {
    return next(new ErrorResponse(`No pet vaccine with the id of ${req.params.id}`), 404);
  }

  petVaccine = await PetVaccine.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: petVaccine
  });
});

// @description: delete vet
// @route: DELETE /vet/:id/delete
// @access: private
exports.deletePetVaccine = asyncHandler(async (req, res, next) => {
  const petVaccine = await PetVaccine.findById(req.params.id);

  if (!petVaccine) {
    return next(new ErrorResponse(`No vet with the id of ${req.params.id}`), 404);
  }

  const pet = await Pet.findById(petVaccine.pet);

  // Make sure user is pet owner
  if (pet.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete petVaccine ${petVaccine._id}`, 401));
  }

  await petVaccine.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
