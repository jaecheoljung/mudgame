const constant = require('./constants.json');
const map = require('./maps.json');


constantManager = {
    gameName : constant.gameName,

}

mapManager = {
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


module.exports = {
    constantManager,
    mapManager
};