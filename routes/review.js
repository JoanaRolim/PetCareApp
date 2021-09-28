const express = require('express');
const { getReviews, getReview, addReview, updateReview, deleteReview } = require('../controllers/Review');

const Review = require('../model/Review');
const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

router.route('/').get(
    advancedResults(Review, {
      path: 'user',
      select: 'name'
    }),
    getReviews
  )

router.route('/:clinicId').post(protect, addReview);

router.route('/:id').get(getReview).put(protect, updateReview).delete(protect, deleteReview);

module.exports = router;
