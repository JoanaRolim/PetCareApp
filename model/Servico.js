const mongoose = require('mongoose');

const ServicoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Por favor, insira o nome do servico.']
  },
  valor: {
    type: Number,
    required: [true, 'Por favor, insira o valor do servico.']
  },
  clinica: {
    type: mongoose.Schema.ObjectId,
    ref: 'Clinica',
    required: true
  }
});

module.exports = mongoose.model('Servico', ServicoSchema);
