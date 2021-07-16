const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Review = require('../model/Review');
const Clinic = require('../model/Clinic');

// @description: get reviews
// @route: GET /review
// @route: GET /clinics/:clinicId/reviews
// @access: public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.clinicId) {
    const reviews = await Review.find({ clinic: req.params.clinicId });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @description: get single review
// @route: GET /review/:id
// @access: public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new ErrorResponse(`No review found with the id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: review
  });
});

// @description: add review
// @route: POST /clinic/:clinicId/reviews
// @access: private
exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.clinic = req.params.clinicId;
  req.body.user = req.user.id;

  const clinic = await Clinic.findById(req.params.clinicId);

  if (!clinic) {
    return next(new ErrorResponse(`No clinic with the id of ${req.params.clinicId}`, 404));
  }

  const review = await Review.create(req.body);

  res.status(201).json({
    success: true,
    data: review
  });
});

// @description: update review
// @route: PUT /review/:id
// @access: private
exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(new ErrorResponse(`No review with the id of ${req.params.id}`, 404));
  }

  // Make sure review belongs to user
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`Not authorized to update review`, 401));
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: review
  });
});

// @description: delete review
// @route: DELETE /review/:id
// @access: private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new ErrorResponse(`No review with the id of ${req.params.id}`, 404));
  }

  // Make sure review belongs to user
  if (review.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to delete this review`, 401));
  }

  await review.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
