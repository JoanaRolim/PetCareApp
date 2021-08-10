const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const PetAllergy = require('../model/PetAllergy');
const Pet = require('../model/Pet');
const Allergy = require('../model/Allergy');

// @description: get vets
// @route: GET /
// @route: GET /:clinicId
// @access: public
exports.getPetAllergies = asyncHandler(async (req, res, next) => {
  if (req.params.petId) {
    const petAllergies = await PetAllergy.find({ pet: req.params.petId });

    return res.status(200).json({
      success: true,
      count: petAllergies.length,
      data: petAllergies
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @description: get single vet
// @route: GET /:id
// @access: public
exports.getPetAllergy = asyncHandler(async (req, res, next) => {
  const petAllergy = await PetAllergy.findById(req.params.id);

  if (!petAllergy) {
    return next(new ErrorResponse(`No pet Allergy service with the id of ${req.params.id}`), 404);
  }

  res.status(200).json({
    success: true,
    data: petAllergy
  });
});

// @description: add vet
// @route: POST /:serviceId
// @access: private
exports.createPetAllergy = asyncHandler(async (req, res, next) => {
  req.body.pet = req.params.petId;

  const pet = await Pet.findById(req.params.petId);

  // Make sure user is pet owner
  if (pet.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to add a Allergy to pet ${pet._id}`, 401));
  }

  const petAllergy = await PetAllergy.create(req.body);

  res.status(200).json({
    success: true,
    data: petAllergy
  });
});

// @description: update vet
// @route: PUT /vet/:id/update
// @access: private
exports.updatePetAllergy = asyncHandler(async (req, res, next) => {
  let petAllergy = await PetAllergy.findById(req.params.id);

  if (!petAllergy) {
    return next(new ErrorResponse(`No pet Allergy with the id of ${req.params.id}`), 404);
  }

  const pet = await Pet.findById(petAllergy.pet);

  // Make sure user is pet owner
  if (pet.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update petAllergy ${petAllergy._id}`, 401));
  }

  petAllergy = await PetAllergy.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: petAllergy
  });
});

// @description: delete vet
// @route: DELETE /vet/:id/delete
// @access: private
exports.deletePetAllergy = asyncHandler(async (req, res, next) => {
  const petAllergy = await PetAllergy.findById(req.params.id);

  if (!petAllergy) {
    return next(new ErrorResponse(`No vet with the id of ${req.params.id}`), 404);
  }

  const pet = await Pet.findById(petAllergy.pet);

  // Make sure user is pet owner
  if (pet.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete petAllergy ${petAllergy._id}`, 401));
  }

  await petAllergy.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
