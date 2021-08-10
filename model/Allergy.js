const mongoose = require('mongoose');

const AllergySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor, insira o nome da alergia.'],
    uppercase: true
  }
});

module.exports = mongoose.model('Allergy', AllergySchema);
