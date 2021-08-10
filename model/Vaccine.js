const mongoose = require('mongoose');

const VaccineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor, insira o nome da vacina.'],
    uppercase: true
  },
  description: {
    type: String,
    required: [true, 'Por favor, insira a descrição da vacina.']
  }
});

module.exports = mongoose.model('Vaccine', VaccineSchema);
