const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor, insira o nome do servico.'],
    uppercase: true
  },
  description: {
    type: String,
    required: [true, 'Por favor, insira a descrição do serviço.']
  },
  cost: {
    type: Number,
    required: [true, 'Por favor, insira o valor do servico.']
  },
  clinic: {
    type: mongoose.Schema.ObjectId,
    ref: 'Clinic',
    required: true
  }
});

module.exports = mongoose.model('Service', ServiceSchema);
