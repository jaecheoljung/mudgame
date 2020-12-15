const { Player } = require("../models/Player");

async function ranking(req, res, next) {
  const listLimit = 10;
  const player = await Player.find({ status: 2 }).sort({ move: 1 }).limit(listLimit);
  const rankList = [];
  player.forEach(element => rankList.push({'name':element.name, 'move':element.move}));
  console.log(rankList);
  
  res.send(rankList);
  
  next();

};

module.exports = {
  ranking
}