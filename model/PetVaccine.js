const mongoose = require('mongoose');

const PetVaccineSchema = new mongoose.Schema({
  pet: {
    type: mongoose.Schema.ObjectId,
    ref: 'Pet',
    required: true
  },
  vaccine: {
    type: mongoose.Schema.ObjectId,
    ref: 'Vaccine',
    required: [true, 'Por favor, insira a vacina.']
  },
  date: {
    type: String,
    required: [true, 'Por favor, insira a data da vacina.']
  }
});

module.exports = mongoose.model('PetVaccine', PetVaccineSchema);
