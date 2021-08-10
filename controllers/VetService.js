const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const VetService = require('../model/VetService');
const Clinic = require('../model/Clinic');
const Service = require('../model/Service');

// @description: get vets
// @route: GET /
// @route: GET /:clinicId
// @access: public
exports.getVetServices = asyncHandler(async (req, res, next) => {
  if (req.params.serviceId) {
    const vetServices = await VetService.find({ service: req.params.serviceId });

    return res.status(200).json({
      success: true,
      count: vetServices.length,
      data: vetServices
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @description: get single vet
// @route: GET /:id
// @access: public
exports.getVetService = asyncHandler(async (req, res, next) => {
  const vetService = await VetService.findById(req.params.id);

  if (!vetService) {
    return next(new ErrorResponse(`No vet service with the id of ${req.params.id}`), 404);
  }

  res.status(200).json({
    success: true,
    data: vetService
  });
});

// @description: add vet
// @route: POST /:serviceId
// @access: private
exports.createVetService = asyncHandler(async (req, res, next) => {
  req.body.service = req.params.serviceId;

  const service = await Service.findById(req.params.serviceId);

  const clinic = await Clinic.findById(service.clinic);

  // Make sure user is clinic owner
  if (clinic.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to add a vet to clinic ${clinic._id}`, 401));
  }

  const vetService = await VetService.create(req.body);

  res.status(200).json({
    success: true,
    data: vetService
  });
});

// @description: update vet
// @route: PUT /vet/:id/update
// @access: private
exports.updateVetService = asyncHandler(async (req, res, next) => {
  let vetService = await VetService.findById(req.params.id);

  if (!vetService) {
    return next(new ErrorResponse(`No vet with the id of ${req.params.id}`), 404);
  }

  const service = await Service.findById(vetService.service);

  const clinic = await Clinic.findById(service.clinic);

  // Make sure user is clinic owner
  if (clinic.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update vet ${vetService._id}`, 401));
  }

  vetService = await VetService.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: vetService
  });
});

// @description: delete vet
// @route: DELETE /vet/:id/delete
// @access: private
exports.deleteVetService = asyncHandler(async (req, res, next) => {
  const vetService = await VetService.findById(req.params.id);

  if (!vetService) {
    return next(new ErrorResponse(`No vet with the id of ${req.params.id}`), 404);
  }

  const service = await Service.findById(vetService.service);

  const clinic = await Clinic.findById(service.clinic);

  // Make sure user is clinic owner
  if (clinic.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete vet ${vetService._id}`, 401));
  }

  await vetService.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
