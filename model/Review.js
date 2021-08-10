const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Por favor, insira o titulo da sua review.']
  },
  text: {
    type: String,
    required: [true, 'Por favor, insira a descrição da sua review.']
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'Por favor, insira uma nota entre 1 e 10.']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  clinic: {
    type: mongoose.Schema.ObjectId,
    ref: 'Clinic',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

// Prevent user from submitting more than one review per clinic
ReviewSchema.index({ clinic: 1, user: 1 }, { unique: true });

// Static method to get average rating and save
ReviewSchema.statics.getAverageRating = async function (clinicId) {
  const obj = await this.aggregate([
    {
      $match: { clinic: clinicId }
    },
    {
      $group: {
        _id: '$clinic',
        averageRating: { $avg: '$rating' }
      }
    }
  ]);

  try {
    await this.model('Clinic').findByIdAndUpdate(clinicId, {
      averageRating: obj[0].averageRating
    });
  } catch (err) {
    console.log(err);
  }
};

// Call getAverageCost after save
ReviewSchema.post('save', function () {
  this.constructor.getAverageRating(this.clinic);
});

// Call getAverageCost before remove
ReviewSchema.pre('remove', function () {
  this.constructor.getAverageRating(this.clinic);
});

module.exports = mongoose.model('Review', ReviewSchema);
