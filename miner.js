module.exports = function (source) {
    var minerIndex, minerValue = -1;
    //console.log('moveTo :' + JSON.stringify(source))
    for (var i = 0; i < source.miners.length; i++) {
        var creep = Game.creeps[source.miners[i]];
        if (creep === undefined) {
            source.miners.splice(i, 1);
            continue;
        }
        var sources = creep.room.find(Game.SOURCES);
        creep.moveTo(source.minerLocations[i])
    	if(creep.energy < creep.energyCapacity) {   //harvest
    		creep.harvest(sources[source.id]);
    	}
    	
    	if (creep.energy > minerValue) {
    	    minerIndex = i;
    	    minerValue = creep.energy
    	}
    }
    
    if (source.miners.length > 0) {
        for (var i = 0; i < source.couriers.length; i++) {
            var creep = Game.creeps[source.couriers[i]];
            if (creep === undefined) {
                source.couriers.splice(i, 1);
                continue;
            }
            var miner = Game.creeps[source.miners[minerIndex]];
            //console.log('courier :' + creep);
            if (creep.energy <= (creep.energyCapacity/2) && minerIndex !== undefined) {
                creep.moveTo(miner);
                miner.transferEnergy(creep, Math.min(creep.energyCapacity - creep.energy, miner.energy));
            } else if (creep.energy > (creep.energyCapacity/2)) {
                var spawn = creep.pos.findNearest(Game.MY_SPAWNS);
                if (spawn === null) {
                    console.log('why is this null?');
                    continue;
                }
                
        	    if ((spawn.energy + creep.energy) > spawn.energyCapacity) {
        	        creep.moveTo({
        	            x: spawn.pos.x, 
        	            y: spawn.pos.y + 5
        	        });
        	    } else {
            		creep.moveTo(spawn);
            		creep.transferEnergy(spawn);
        	    }
            }
        }
    }
}