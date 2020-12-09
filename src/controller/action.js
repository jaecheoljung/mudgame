const { constantManager, mapManager, inventoryManager, monsterManager, itemManager } = require("../datas/Manager");
const item = require('../datas/items.json');
const e = require("express");


function _draw (player) {
  const field = mapManager.getField(player.x, player.y);
  const minimap = mapManager.makeMinimap(player.x, player.y);
  const inventory = inventoryManager.alignInventory(player.items);
  return { player, minimap, inventory, field };
}

async function action (req, res) {
    const { action } = req.body;
    const player = req.player;
    
    if (action === "query") {
      return res.send(_draw(player));
    }
    
    if (action === "move") {
      const d = req.body.direction;
      const move = {
        "0": [0, -1],
        "1": [1, 0],
        "2": [0, 1],
        "3": [-1, 0]
      };
      const mx = move[d][0];
      const my = move[d][1];
      player.x += mx;
      player.y += my;

      const field = mapManager.getField(player.x, player.y);
      const events = field.events;

      if (events.length > 0) {
        let _event = parseFloat(events[0]) > Math.random() ? events[1] : events[2];
        
        if (_event.type === "battle") {
        }
        
        if (_event.type === "item") {
          const itemJson = itemManager.getItem();
          const itemId = _event.item;
          const item = itemJson.find(x => x.id === itemId);
          const prop = item.hasOwnProperty('str')? 'str' : 'def';
          if (player.getItem(item.name)) {
            player[prop] += item[prop];
            field.description += ` / ${item.name}을 획득해 ${prop}이 ${item[prop]}만큼 증가했다.`
          }
          else {
            field.description += ` / ${item.name}가 이미 존재한다.`  
          }
        };
      }
      await player.save();
      return res.send(_draw(player));
    }
  }

  module.exports = {
      action
  }