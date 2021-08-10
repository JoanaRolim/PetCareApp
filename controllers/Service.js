const ErrorResponse = require('../utils/errorResponse');
const Service = require('../model/Service');
const Clinic = require('../model/Clinic');
const asyncHandler = require('../middleware/async');

// @description: get Services
// @route: GET /api/v1/Services
// @route: GET /api/v1/Clinics/:ClinicId/Services
// @access: public
exports.getServices = asyncHandler(async (req, res, next) => {
  if (req.params.clinicId) {
    const Services = await Service.find({ clinic: req.params.clinicId });

    return res.status(200).json({
      success: true,
      count: Services.length,
      data: Services
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @description: Get single Service
// @route: GET /api/v1/Services/:id
// @access: public
exports.getService = asyncHandler(async (req, res, next) => {
  const service = await Service.findById(req.params.id).populate({
    path: 'Clinic',
    select: 'name'
  });

  if (!service) {
    return next(new ErrorResponse(`No service with the id of ${req.params.id}`), 404);
  }

  res.status(200).json({
    success: true,
    data: service
  });
});

// @description:  Add Service
// @route: POST /api/v1/Clinics/:ClinicId/Services
// @access: private
exports.createService = asyncHandler(async (req, res, next) => {
  req.body.clinic = req.params.clinicId;

  const clinic = await Clinic.findById(req.params.clinicId);

  if (!clinic) {
    return next(new ErrorResponse(`No Clinic with the id of ${req.params.clinicId}`), 404);
  }

  // Make sure user is Clinic owner
  if (clinic.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to add a service to this clinic ${clinic._id}`, 401));
  }

  const service = await Service.create(req.body);

  res.status(200).json({
    success: true,
    data: service
  });
});

// @description:  Update Service
// @route: PUT /api/v1/Services/:id
// @access: private
exports.updateService = asyncHandler(async (req, res, next) => {
  let service = await Service.findById(req.params.id);

  if (!service) {
    return next(new ErrorResponse(`No service with the id of ${req.params.id}`), 404);
  }

  const clinic = await Clinic.findById(service.clinic);

  // Make sure user is Clinic owner
  if (clinic.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update service ${Service._id}`, 401));
  }

  service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: service
  });
});

// @description:  Delete Service
// @route: DELETE /api/v1/Services/:id
// @access: private
exports.deleteService = asyncHandler(async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return next(new ErrorResponse(`No Service with the id of ${req.params.id}`), 404);
  }

  const clinic = await Clinic.findById(service.clinic);

  // Make sure user is Clinic owner
  if (clinic.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update service ${Service._id}`, 401));
  }

  await service.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
