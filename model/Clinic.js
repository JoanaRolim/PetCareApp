const mongoose = require('mongoose');

const ClinicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name.']
  },
  cnpj: {
    type: String,
    required: [true, 'Please add your cpf.'],
    unique: true
  },
  address: {
    type: String,
    required: [true, 'Please add your adress.']
  },
  cidade: {
    type: String,
    required: [true, 'Please add your city.']
  },
  estado: {
    type: String,
    required: [true, 'Please add your state.']
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone.']
  },
  cellphone: {
    type: String,
    required: [true, 'Please add a phone.']
  },
  email: {
    type: String,
    required: [true, 'Please add an email.'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email.']
  },
  averageRating: {
    type: Number,
    min: [1, 'A nota deve ser pelo menos 1.'],
    max: [10, 'A nota não pode ser maior que 10.']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Clinic', ClinicSchema);
