var utils = require('utils');
module.exports = function (creep) {
	var targets = creep.pos.findInRange(Game.HOSTILE_CREEPS, 4);
	if (targets !== null && targets.length > 0) { //OH FUCK
		utils.bail(creep, targets[0])
	}
	else if(creep.energy < creep.energyCapacity) {
		var sources = creep.room.find(Game.SOURCES);
		creep.moveTo(sources[creep.memory.primarySource]);
		creep.harvest(sources[creep.memory.primarySource]);
	}
	else {
	    var spawn = creep.pos.findNearest(Game.MY_SPAWNS);
		creep.moveTo(spawn);
		creep.transferEnergy(spawn)
	}
}
