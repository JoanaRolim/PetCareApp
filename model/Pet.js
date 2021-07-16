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
  allergy: {
    type: String,
    enum: ['Sim', 'Não'],
    required: true
  },
  allergyDescription: {
    type: String,
    default: 'Não informado.'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

// ******************NAO DEU CERTO ESSAS FUNÇÃO******************************
// Static method to get pet age and save
PetSchema.statics.getPetAge = async function (petId) {
  var ano_atual = new Date().getFullYear();
  let pet = await this.model('Pet').findById(petId);
  var ano_nascimento = pet.birthDate.split('/')[2];

  try {
    await this.model('Pet').findByIdAndUpdate(petId, {
      age: ano_atual - ano_nascimento
    });
  } catch (err) {
    console.log(err);
  }
};

// Call getAverageCost after save
PetSchema.post('save', function () {
  this.constructor.getPetAge(this.pet);
});

// Call getAverageCost before remove
PetSchema.pre('remove', function () {
  this.constructor.getPetAge(this.pet);
});

// ******************NAO DEU CERTO ESSAS FUNÇÃO******************************

module.exports = mongoose.model('Pet', PetSchema);
