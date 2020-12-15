const { Player } = require("../models/Player");

async function ranking() {
  const listLimit = 10;
  const player = await Player.find({ status: -1 }).sort({ move: 1 }).limit(listLimit);
  const rankList = [];
  player.forEach(element => rankList.push({'name':element.name, 'move':element.move}));
  return rankList;
};

module.exports = {
  ranking
}