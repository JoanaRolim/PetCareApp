const mongoose = require('mongoose');

const VetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name.']
  },
  lastname: {
    type: String,
    required: [true, 'Please add a lastname.']
  },
  email: {
    type: String,
    required: [true, 'Please add an email.'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email.']
  },
  cpf: {
    type: String,
    required: [true, 'Please add your cpf.'],
    unique: true
  },
  crmv: {
    type: String,
    required: [true, 'Please add your cpf.'],
    unique: true
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone.']
  },
  clinic: {
    type: mongoose.Schema.ObjectId,
    ref: 'Clinic',
    required: true
  }
});

module.exports = mongoose.model('Vet', VetSchema);
