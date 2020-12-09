const { constantManager, mapManager, inventoryManager, monsterManager, itemManager } = require("../datas/Manager");
const item = require('../datas/items.json');
const e = require("express");

async function action (req, res) {
    const { action } = req.body;
    const player = req.player;
    let event = null;
    if (action === "query") {
      const field = mapManager.getField(req.player.x, req.player.y);
      const minimap = mapManager.makeMinimap(req.player.x, req.player.y);
      let playerItems = [];
      player.items.forEach(element => playerItems.push(item[element].name));
      inventory=inventoryManager.alignInventory(playerItems);
      return res.send({ player, minimap, inventory, field });
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
      
      let field = mapManager.getField(x, y);
      if (!field) res.sendStatus(400);
      player.x = x;
      player.y = y;
      
      const events = field.events;
      let _event = {};
  
      if (events.length > 0) {
        console.log(events)
        if (parseFloat(events[0]) > Math.random()) _event = events[1];
        else _event = events[2];
        if (_event.type === "battle") {
          // TODO: 이벤트 별로 events.json 에서 불러와 이벤트 처리

        } else if (_event.type === "item") {
          const itemJson = itemManager.getItem();
          const itemId = _event.item;
          let item = {};
          itemJson.forEach((e) => {
            if(e.id === itemId) item = e;
          });
          if (item.hasOwnProperty('str') === true) {
            player.str += item.str
            field.description += ` / ${item.name}을 획득해 str을 ${item.str}만큼 회복했다.`
          } else if (item.hasOwnProperty('def') === true) {
            player.def += item.def;
            field.description += ` / ${item.name}을 획득해 def을 ${item.def}만큼 회복했다.`
          };
        }
      }
      
      if(player.HP<=0){ // 사망시 경험치, 좌표 초기화
        player.death();
        field = mapManager.getField(player.x, player.y);
      }
       
      // player.getItem("1"); //"1"번 아이템을 획득하여 사용자 인벤토리에 추가
      const minimap = await mapManager.makeMinimap(req.player.x, req.player.y);
      let playerItems = [];
      player.items.forEach(element => playerItems.push(item[element].name));
      inventory=inventoryManager.alignInventory(playerItems);

      await player.save();
      return res.send({ player, field, minimap, inventory, event });
    }
  }

  module.exports = {
      action
  }