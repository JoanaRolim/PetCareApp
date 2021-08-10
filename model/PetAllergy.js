const mongoose = require('mongoose');

const PetAllergySchema = new mongoose.Schema({
  pet: {
    type: mongoose.Schema.ObjectId,
    ref: 'Pet',
    required: true
  },
  allergy: {
    type: mongoose.Schema.ObjectId,
    ref: 'Allergy',
    required: true
  },
  description: {
    type: String,
    required: [true, 'Por favor, insira a descrição da alergia.'],
    default: 'Não informado'
  }
});

module.exports = mongoose.model('PetAllergy', PetAllergySchema);
