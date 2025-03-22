const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
