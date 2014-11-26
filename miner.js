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
            console.log('couriers');
            if (creep === undefined) { //you're gone :(
                source.couriers.splice(i, 1);
                continue;
            }
            if (creep.energy + 20 >= creep.energyCapacity) { //you're full, go home
                var spawn = creep.pos.findNearest(Game.MY_SPAWNS);
                creep.moveTo(spawn);
                creep.transferEnergy(spawn);
            } else { //get as much as you can
                var minerIndex;
                var minerEnergy = -1;
                for (var j = 0; j < source.miners.length; j++) { //go through miners, get energy from them
                    var miner = Game.creeps[source.miners[j]];
                    console.log('minerEnergy :' + minerEnergy + ' miner.energy' + miner.energy)
                    if (miner.energy > minerEnergy) {
                        minerIndex = j;
                        console.log('getting from i' + i)
                        minerEnergy = miner.energy;
                    }
                    miner = Game.creeps[source.miners[minerIndex]];
                    creep.moveTo(miner);
                    miner.transferEnergy(creep, Math.min(creep.energyCapacity - creep.energy, miner.energy));
                }
            }

/*
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
                */
        }
    }
}