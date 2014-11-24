module.exports = function (creep) {
    var harvester = require('harvester');
    var home = Game.spawns.Spawn1;
    if (home.energy < 0) {
        harvester(creep);
    } else {
    	if(creep.energy === 0) {
    		creep.moveTo(Game.spawns.Spawn1);
    		Game.spawns.Spawn1.transferEnergy(creep);
    	}
    	else {
    		var targets = creep.room.find(Game.CONSTRUCTION_SITES);
    		if(targets.length) {
    			creep.moveTo(targets[0]);
    			creep.build(targets[0]);
    		}
    	}
    }
}
