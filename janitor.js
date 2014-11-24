module.exports = function (creep) {
	var targets = creep.room.find(Game.STRUCTURES);
	if(targets.length) {
	    for (var i = 0; i < targets.length; i++) {
	        if (targets[i].hits < targets[i].hitsMax) {
            	if(creep.energy === 0) {
            		creep.moveTo(Game.spawns.Spawn1);
            		Game.spawns.Spawn1.transferEnergy(creep);
            	} else {
        			creep.moveTo(targets[i]);
        			creep.repair(targets[i]);
            	}
	        }
	    }
	} else {
	    creep.moveTo(23, 23);
	}
}
