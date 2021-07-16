const mongoose = require('mongoose');

const VetServicoSchema = new mongoose.Schema({
  veterinario: {
    type: mongoose.Schema.ObjectId,
    ref: 'Veterinario',
    required: true
  },
  servico: {
    type: mongoose.Schema.ObjectId,
    ref: 'Servico',
    required: true
  }
});

module.exports = mongoose.model('VetServico', VetServicoSchema);
