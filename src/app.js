const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const marioModel = require("./models/marioChar");

// Middlewares
app.use(express.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/mario", (req, res) => {
    marioModel.find().then((result)=>{
        res.send(result);
    });
});

app.get("/mario/:id", (req, res) => {
  let id = req.params.id;
  marioModel
    .findById(id)
    .then((result) => {
        if(!result){
            res.status(400).send({"meassage": "error.message"});
            return;
        }
        res.send(result);
    }).catch(error=>{
        res.status(404).send(error);
    });
});

app.post("/mario", (req, res) => {
  const name = req.body.name;
  const weight = req.body.weight;
  if (name === undefined || weight === undefined) {
    res.status(400).json({ message: "either name or weight is missing" });
    return;
  }
  const character = new marioModel({
    name: name,
    weight: weight
  });
  character
    .save()
    .then((result) => {
      res.status(201).json(result);
    });
});

app.patch("/mario/:id", function (req, res) {
  const id = req.params.id;
  const updateobjec = req.body;
  marioModel
    .findByIdAndUpdate({ _id: id }, { $set: updateobjec })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).json({ message: "error.message" });
    });
});

app.delete("/mario/:id", (req, res) => {
  const id = req.params.id;
  marioModel
    .findByIdAndRemove({ _id: id })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "character deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "error.message" });
    });
});

module.exports = app;