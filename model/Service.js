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
    type: String,
    required: [true, 'Por favor, insira o valor do servico.']
  },
  indications: {
    type: String,
    required: [true, 'Por favor, insira a indicação do serviço.']
  },
  vet: {
    type: mongoose.Schema.ObjectId,
    ref: 'Vet',
    required: true
  },
  clinic: {
    type: mongoose.Schema.ObjectId,
    ref: 'Clinic',
    required: true
  }
});

module.exports = mongoose.model('Service', ServiceSchema);
