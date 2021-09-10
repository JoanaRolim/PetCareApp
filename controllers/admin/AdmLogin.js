const path = require('path');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const Admin = require('../../model/admLogin');

// @description: get all adms
// @route: GET /admin
// @access: public
exports.getAdmins = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @description: get single admin
// @route: GET /admin/:id
// @access: public
exports.getAdmin = asyncHandler(async (req, res, next) => {
  const admin = await Admin.findById(req.params.id);

  if (!admin) {
    return next(new ErrorResponse(`admin not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: admin
  });
});

// @description: create admin
// @route: POST /admin/create
// @access: private
exports.createAdmin = asyncHandler(async (req, res, next) => {
  const admin = await Admin.create(req.body);

  res.status(201).json({
    success: true,
    data: admin
  });
});

// @description: update admin
// @route: UPDATE /admin/:id/update
// @access: private
exports.updateAdmin = asyncHandler(async (req, res, next) => {
  let admin = await Admin.findById(req.params.id);

  if (!admin) {
    return next(new ErrorResponse(`admin not found with id of ${req.params.id}`, 404));
  }

  admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: admin
  });
});

// @description: delete admin
// @route: DELETE /admin/:id/delete
// @access: private
exports.deleteAdmin = asyncHandler(async (req, res, next) => {
  const admin = await Admin.findById(req.params.id);

  if (!admin) {
    return next(new ErrorResponse(`admin not found with id of ${req.params.id}`, 404));
  }

  admin.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
