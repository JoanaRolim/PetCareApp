const crypto = require('crypto');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const sendEmail = require('../../utils/sendEmail');
const Admin = require('../../model/admLogin');

// Get token from model, create cookie and send response
const sendTokenResponse = (admin, statusCode, res) => {
  // Create token
  const token = admin.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    id: admin.id,
    name: admin.name
  });
};

// @desc      Register admin
// @route     POST /adminauth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Create admin
  const admin = await admin.create({
    name,
    email,
    password
  });

  sendTokenResponse(admin, 200, res);
});

// @desc      Login admin
// @route     POST /adminadminauth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Por favor, informe um email e uma senha.', 400));
  }

  // Check for admin
  const admin = await Admin.findOne({ email }).select('+password');

  if (!admin) {
    return next(new ErrorResponse('Credenciais Inválidas', 401));
  }

  // Check if password matches
  const isMatch = await admin.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Credenciais Inválidas', 401));
  }

  sendTokenResponse(admin, 200, res);
});

// @desc      Log admin out / clear cookie
// @route     GET /adminauth/logout
// @access    Public
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc      Get current logged in admin
// @route     GET /adminauth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  // admin is already available in req due to the protect middleware
  const admin = req.admin;

  res.status(200).json({
    success: true,
    data: admin
  });
});

// @desc      Update admin details
// @route     PUT /adminauth/updatedetails
// @access    Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = req.body;

  const admin = await Admin.findByIdAndUpdate(req.admin.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: admin
  });
});

// @desc      Update password
// @route     PUT /adminauth/updatepassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const admin = await Admin.findById(req.admin.id).select('+password');

  // Check current password
  if (!(await admin.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Senha Inválida', 401));
  }

  admin.password = req.body.newPassword;
  await admin.save();

  sendTokenResponse(admin, 200, res);
});

// @desc      Reset password
// @route     PUT /adminauth/resetpassword/:resettoken
// @access    Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');

  const admin = await Admin.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!admin) {
    return next(new ErrorResponse('Código Inválido', 400));
  }

  // Set new password
  admin.password = req.body.password;
  admin.resetPasswordToken = undefined;
  admin.resetPasswordExpire = undefined;
  await admin.save();

  sendTokenResponse(admin, 200, res);
});
