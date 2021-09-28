const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor, insira seu nome.']
  },
  type: {
    type: String,
    enum: ['Cachorro', 'Gato', 'Peixe', 'Pássaro', 'Coelho'],
    required: [true, 'Insira o tipo do seu pet.']
  },
  breed: {
    type: String,
    required: [true, 'Por favor, insira a raça do seu pet.']
  },
  age: {
    type: String
  },
  weight: {
    type: String,
    required: [true, 'Por favor, insira o peso em KG do seu pet.']
  },
  height: {
    type: String,
    required: [true, 'Por favor, insira a altura em cm.']
  },
  allergy: {
    type: String,
    required: [true, 'Por favor, insira as alergias do seu pet.']
  },
  //COLOQUEI PARA TESTE
  castracao: {
    type: String,
    enum: ['Sim', 'Não'],
    required: [true, 'Insira se seu pet é castrado.']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Pet', PetSchema);
