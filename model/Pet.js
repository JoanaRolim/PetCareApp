const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor, insira seu nome.']
  },
  birthDate: {
    type: String,
    required: [true, 'Por favor, insira a data de nascimento do pet.']
  },
  age: {
    type: Number
  },
  type: {
    type: String,
    enum: ['Cachorro', 'Gato', 'Peixe', 'Pássaro'],
    required: [true, 'Insira o tipo do seu pet.']
  },
  breed: {
    type: String,
    required: [true, 'Por favor, insira a raça do seu pet.']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Pet', PetSchema);
