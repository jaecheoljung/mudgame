const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: String,
  key: String,

  level: { type: Number, default: 1 },
  stage: { type: Number, default: 0 },
  move: { type: Number, default: 0 },

  exp: { type: Number, default: 0 },
  maxExp: { type: Number, default: 100 },

  maxHP: { type: Number, default: 50 },
  HP: { type: Number, default: 50 },

  str: { type: Number, default: Math.floor(Math.random()*5) },
  int: { type: Number, default: Math.floor(Math.random()*5) },
  reroll: { type: Number, default: 5 },

  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },

  status: { type: Number, default: 0 }, // 0 start 1 normal 2 encounter 3 battle -1 end
  enemy: { name: String, hp: Number, turn: Number },

  items: [String],
  itemIds: [Number]
});

schema.methods.incrementHP = function (val) {
  const hp = this.HP + val;
  this.HP = Math.min(Math.max(0, hp), this.maxHP)
};

schema.methods.incrementEXP = function (val) {
  const exp = this.exp + val;
  if (exp >= this.maxExp) {
    this.level += parseInt(exp / this.maxExp);
    this.maxHP += 20*parseInt(exp / this.maxExp);
    this.exp = exp % this.maxExp;
  } else {
    this.exp = exp;
  }
};

const Player = mongoose.model("Player", schema);

module.exports = {
  Player
};
