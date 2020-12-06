const constant = require('./constants.json');
const map = require('./maps.json');


constantManager = {
    gameName : constant.gameName,

}

mapManager = {
    getField(x, y) {
        const fieldName = String(parseInt(x)*map.xmax + parseInt(y));
        return map[fieldName];
    }
}


module.exports = {
    constantManager,
    mapManager
};