const { Player } = require("../models/Player");
const crypto = require("crypto");

async function signup(req, res) {
    const { name } = req.body;
    if (await Player.findOne({ name })) {
      const message = "중복된 name이 있습니다. 새로운 name으로 설정해주세요."
      return res.send({message});
    }

    if (name.length<3||name.length>12) {
      const message = "name의 길이를 3~12 사이로 맞춰주세요."
      return res.send({message});
    }
    
    const player = new Player({
      name,
      maxHP: 50,
      HP: 50,
      str: 5,
      def: 5,
      x: 0,
      y: 0
    });
  
    const key = crypto.randomBytes(24).toString("hex");
    player.key = key;
  
    await player.save();
    return res.send({ key });
  };

  module.exports = {
      signup
  }