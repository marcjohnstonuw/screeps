var harvester = require('harvester');

module.exports = function (creep) {
    var energy = creep.room.find(Game.DROPPED_ENERGY)
    if(energy.length > 0) {
        creep.moveTo(energy[0]);
        creep.pickup(energy[0]);
    }
    else {
        cosole.log('going home...')
        harvester(creep);
    }
}
