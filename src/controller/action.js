const { itemManager, monsterManager } = require("../datas/Manager");
const item = require('../datas/items.json');
const e = require("express");


const eventProb = [0.6, 0.85, 1]; // nothing, item, battle

async function action (req, res) {
    const { action } = req.body;
    const player = req.player;
    
    if (action === "reroll") {
      if (player.reroll > 0 && player.x === 0 && player.y === 0 && player.exp === 0) {
        player.str = Math.floor(Math.random()*5);
        player.int = Math.floor(Math.random()*5);
        player.reroll -= 1;
      }
      await player.save();
      const event = '능력치를 재설정했다.';
      const system = '남은 재설정 횟수: ' + player.reroll;
      return res.send(_draw(player, event, system));
    }

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
      if (player.x + mx < 0 || player.y + my < 0 || player.x + mx > 9 || player.y + my > 9) {
        const system = "그 쪽으로는 움직일 수 없다.";
        return res.send(_draw(player, '', system));
      }      
      
      player.x += mx;
      player.y += my;

      const sample = Math.random();
      let event = '';
      let system = '';

      if (sample < eventProb[0]) { // nothing
        event = "아무 일도 일어나지 않았다."
      }
      else if (sample < eventProb[1]) { // item
        const item = itemManager.getRandom();
        const name = item.name[player.stage];
        const str = item.str[player.stage];
        const int = item.int[player.stage];
        player.items.push(name);
        player.str += str;
        player.int += int;
        await player.save();
        event = `${name}을 얻어서 str이 ${str}, int가 ${int} 증가했다!`;
      }
      else { // battle
        const monster = monsterManager.getRandom();
        const name = monster.name[player.stage];
        const str = monster.str[player.stage];
        const int = monster.int[player.stage];
        event = `${name}을 만났다! 상대는 str:${str}, int:${int} 이다!`;
      }
      await player.save();
      return res.send(_draw(player, event, system));
    }
  }

module.exports = {
    action
}



function _draw (player, event='', system='') {
  const minimap = _map(player.x, player.y);
  const inventory = _list(player.items);
  return { player, minimap, inventory, event, system };
}


function _map(x, y) {
  const blankline = '□□□□□□□□□□'+'\n';
  const currentline = '□'.repeat(x)+'■'+'□'.repeat(9-x)+'\n';
  const map = blankline.repeat(y)+currentline+blankline.repeat(9-y);
  return map;
}

function _list(items) {
  let res = {};
  for (let i of items) {
    res[i] = i in res? res[i]+1 : 1;
  }
  const x = Object.keys(res).reduce((acc, cur) => acc + `${cur} : ${res[cur]}개\n`, '');
  console.log(x);
  console.log(res);
  return x;
}