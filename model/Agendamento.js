const mongoose = require('mongoose');

const AgendamentoSchema = new mongoose.Schema({
  data: {
    type: String,
    required: [true, 'Por favor, insira a data desejada.']
  },
  horario: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  pet: {
    type: mongoose.Schema.ObjectId,
    ref: 'Pet',
    required: true
  },
  service: {
    type: mongoose.Schema.ObjectId,
    ref: 'Service',
    required: true
  },
  clinic: {
    type: mongoose.Schema.ObjectId,
    ref: 'Clinic',
    required: true
  }
});

module.exports = mongoose.model('Agendamento', AgendamentoSchema);
