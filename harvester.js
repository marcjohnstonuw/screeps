module.exports = function (creep) {

	if(creep.energy < creep.energyCapacity) {
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