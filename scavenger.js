var harvester = require('harvester');

module.exports = function (creep) {
    var energy = creep.room.find(Game.DROPPED_ENERGY)
    console.log('energy :' + JSON.stringify(energy));
    if(energy !== null && energy.length > 0) {
    	if (creep.energy < creep.energyCapacity) {
	        creep.moveTo(energy[0]);
	        creep.pickup(energy[0], Math.min(creep.energyCapacity - creep.energy, energy[0].energy));
	    } else {
		    var spawn = creep.pos.findNearest(Game.MY_SPAWNS);
			creep.moveTo(spawn);
			creep.transferEnergy(spawn)
	    }
    }
    else {
        harvester(creep);
    }
}
