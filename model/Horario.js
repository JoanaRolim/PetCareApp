const mongoose = require('mongoose');

const HorarioSchema = new mongoose.Schema({
  clinic: {
    type: mongoose.Schema.ObjectId,
    ref: 'Clinic',
    required: true
  },
  horario: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Horario', HorarioSchema);
