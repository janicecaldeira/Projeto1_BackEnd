const express = require("express");
const jogoSchema = require("./models/jogos");
const mongoose = require("./database");

const app = express();
const port = 3000;

app.use(express.json());

const validaId = id => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(422).send({ error: "ID inválido" });
    return;
  }
};

const jogoExiste = jogo => {
  if (!jogo) {
    res.status(404).send({ erro: "Jogo não encontrado!" });
    return;
  }
};

const validaJogo = jogo => {
  if (!jogo || !jogo.nome || !jogo.imagem) {
    res.status(400).send({ error: "Jogo inválido!" });
    return;
  }
};

app.get("/", (req, res) => {
  res.send({ info: "Projeto de jogos com MongoDB" });
});

app.get("/jogos", async (req, res) => {
  const jogos = await jogoSchema.find();
  res.send(jogos);
});

app.get("/jogos/:id", async (req, res) => {
  const id = req.params.id;

  validaId(id);

  const jogo = await jogoSchema.findById(id);

  jogoExiste(jogo);

  res.send({ jogo });
});

app.post("/jogos", async (req, res) => {
  const jogo = req.body;

  validaJogo(jogo);

  const novoJogo = await new jogoSchema(jogo).save();
  res.status(201).send({ novoJogo });
});

app.put("/jogos/:id", async (req, res) => {
  const id = req.params.id;

  validaId(id);

  const jogo = await jogoSchema.findById(id);

  jogoExiste(jogo);

  const novoJogo = req.body;

  validaJogo(jogo);

  await jogoSchema.findOneAndUpdate({ _id: id }, novoJogo);
  const jogoAtualizado = await jogoSchema.findById(id);

  res.send({ jogoAtualizado });
});

app.delete("/jogos/:id", async (req, res) => {
  const id = req.params.id;

  validaId(id);

  const jogo = await jogoSchema.findById(id);

  jogoExiste(jogo);

  await jogoSchema.findByIdAndDelete(id);
  res.send({ message: "Jogo excluído com sucesso!" });
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
