var janitor = require('janitor');

module.exports = function (creep) {
    var harvester = require('harvester');
    var home = Game.spawns.Spawn1;
    var targets = creep.room.find(Game.CONSTRUCTION_SITES);
    if(targets.length) {
        if(creep.energy === 0) {
            creep.moveTo(Game.spawns.Spawn1);
            Game.spawns.Spawn1.transferEnergy(creep);
        } else {
            creep.moveTo(targets[0]);
            creep.build(targets[0]);
        }
    } else {
        console.log('janitor now');
        janitor(creep);
    }
}