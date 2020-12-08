const mongoose = require('mongoose');

//  Your code goes here

const mario = new mongoose.Schema({
    name: {
      type: String,
      required: false
    },
    weight: {
      type: Number,
      required: false
    }
  });

const marioModel = mongoose.model("marioModel", mario);

module.exports = marioModel;