const { constantManager, mapManager } = require("../datas/Manager");

async function action (req, res) {
    const { action } = req.body;
    const player = req.player;
    let event = null;
    if (action === "query") {
      const field = mapManager.getField(req.player.x, req.player.y);
      const minimap = mapManager.makeMinimap(req.player.x, req.player.y);
      return res.send({ player, minimap, field });
    } else if (action === "move") {
      const direction = parseInt(req.body.direction, 0); // 0 북. 1 동 . 2 남. 3 서.
      let x = req.player.x;
      let y = req.player.y;
      if (direction === 0) {
        y -= 1;
      } else if (direction === 1) {
        x += 1;
      } else if (direction === 2) {
        y += 1;
      } else if (direction === 3) {
        x -= 1;
      } else {
        res.sendStatus(400);
      }
      
      const field = mapManager.getField(x, y);
      if (!field) res.sendStatus(400);
      player.x = x;
      player.y = y;
  
      const events = field.events;
  
      if (events.length > 0) {
        // TODO : 확률별로 이벤트 발생하도록 변경
        const _event = events[0];
        if (_event.type === "battle") {
          // TODO: 이벤트 별로 events.json 에서 불러와 이벤트 처리
  
          event = { description: "늑대와 마주쳐 싸움을 벌였다." };
          player.incrementHP(-1);
        } else if (_event.type === "item") {
          event = { description: "포션을 획득해 체력을 회복했다." };
          player.incrementHP(1);
          player.HP = Math.min(player.maxHP, player.HP + 1);
        }
      }
      //player.incrementHP(1);
      player.incrementEXP(30);
      
      const minimap = await mapManager.makeMinimap(req.player.x, req.player.y);
      await player.save();
      return res.send({ player, field, minimap,  event });
    }
  }

  


  module.exports = {
      action
  }