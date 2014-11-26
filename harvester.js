module.exports = function (creep) {
	var targets = creep.pos.findInRange(Game.HOSTILE_CREEPS, 4);
	if (targets !== null && targets.length > 0) { //OH FUCK
		var spawn = creep.pos.findNearest(Game.MY_SPAWNS);
		var home = creep.pos.findPathTo(spawn);
		var homeDirection = home[0].direction;
		var path = creep.pos.findPathTo(targets[0])
		var towards = path[0].direction;
		var away = ((towards + 3) % 8) + 1;
		creep.move(away);
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
