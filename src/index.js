const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const crypto = require("crypto");

const { constantManager, mapManager, inventoryManager } = require("./datas/Manager");
const { Player } = require("./models/Player");
const { secret, mongoURI } = require("../config");
const { action } = require("./controller/action");
const { signup } = require("./controller/sign");
const { authentication } = require("./middle/auth");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
    .then(() => console.log('Successfully connected to mongodb')) // mongodb connection success
    .catch(e => console.error(e));

app.get("/", (req, res) => {
  res.render("index", { gameName: constantManager.gameName });
});

app.get("/game", (req, res) => {
  res.render("game");
});

app.post("/signup", signup);

app.post("/action", authentication, action);

app.get("/ending", (req, res) => {
  res.render("ending", { score: req.score });
});

app.listen(3000, () => {
  console.log(`listening at http://localhost:3000`); // 정상 시작 알림
})

