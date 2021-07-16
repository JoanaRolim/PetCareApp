const mongoose = require('mongoose');

const AgendamentoSchema = new mongoose.Schema({
  data: {
    type: Date,
    required: [true, 'Por favor, insira a data desejada.']
  },
  horario: {
    type: Date,
    required: [true, 'Por favor, insira o horário desejado.']
  },
  usuario: {
    type: mongoose.Schema.ObjectId,
    ref: 'Usuario',
    required: true
  },
  pet: {
    type: mongoose.Schema.ObjectId,
    ref: 'Pet',
    required: true
  },
  servico: {
    type: mongoose.Schema.ObjectId,
    ref: 'Servico',
    required: true
  },
  clinica: {
    type: mongoose.Schema.ObjectId,
    ref: 'Clinica',
    required: true
  }
});

module.exports = mongoose.model('Agendamento', AgendamentoSchema);
