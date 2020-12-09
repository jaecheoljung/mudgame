const constant = require('./constants.json');
const map = require('./maps.json');
const item = require('./items.json');
const monster = require('./monsters.json');

const constantManager = {
    gameName : constant.gameName,

}

const mapManager = {
    getField(x, y) {
        const fieldName = String(parseInt(x)*map.xmax + parseInt(y));
        return map[fieldName];
    },
    makeMinimap(x,y){
        const blankline = '□□□□□□□□□□'+'\n';
        const currentline = '□'.repeat(x)+'■'+'□'.repeat(map.xmax-x-1)+'\n';
        let mapText = blankline.repeat(y)+currentline+blankline.repeat(map.ymax-y-1);
        return mapText;
    }
}

const inventoryManager ={
    alignInventory(invenArray){
        let list='';
        invenArray.forEach(element => {
            list= list+element+'\n';
        });
        return list;
    }
}

const itemManager = {

}

const monsterManager = {

}

module.exports = {
    constantManager,
    mapManager,
    inventoryManager,
    itemManager,
    monsterManager,
};