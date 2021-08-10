const mongoose = require('mongoose');

const VetServiceSchema = new mongoose.Schema({
  vet: {
    type: mongoose.Schema.ObjectId,
    ref: 'Vet',
    required: true
  },
  service: {
    type: mongoose.Schema.ObjectId,
    ref: 'Service',
    required: true
  }
});

module.exports = mongoose.model('VetService', VetServiceSchema);
