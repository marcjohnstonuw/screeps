var janitor = require('janitor');
var utils = require('utils');

module.exports = function (creep) {
    var harvester = require('harvester');
    var home = Game.spawns.Spawn1;
    var targets = creep.room.find(Game.CONSTRUCTION_SITES);
    var threats = creep.pos.findInRange(Game.HOSTILE_CREEPS, 4);
    if (threats !== null && threats.length > 0) { //OH FUCK
        utils.bail(creep, threats[0])
    }
    if(targets.length) {
        if(creep.energy === 0) {
            creep.moveTo(Game.spawns.Spawn1);
            Game.spawns.Spawn1.transferEnergy(creep);
        } else {
            creep.moveTo(targets[0]);
            creep.build(targets[0]);
        }
    } else {
        janitor(creep);
    }
}