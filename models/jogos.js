const mongoose = require("../database/index");

const JogoSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },
  imagem: {
    type: String,
    require: true,
  },
});

const Jogo = mongoose.model("Jogo", JogoSchema);

module.exports = Jogo;