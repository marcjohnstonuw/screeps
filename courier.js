module.exports = function (source) {
    //console.log('moveTo :' + JSON.stringify(source))
    for (var i = 0; i < source.couriers.length; i++) {
        var creep = Game.creeps[source.couriers[i]];
        var sources = creep.room.find(Game.SOURCES);
        creep.moveTo(sources[i])
    	if(creep.energy < creep.energyCapacity) {   //harvest
    		creep.harvest(sources[i]);
    	}
    	else {  //transfer
    		//creep.transferEnergy(spawn)
    	}
    }
}