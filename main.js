var harvester = require('harvester');
var builder = require('builder');
var guard = require('guard');
var janitor = require('janitor');
var config = require('config');
var utils = require('utils');
var init = require('init');
var miner = require('miner');
var healer = require('healer');
var archer = require('archer');


var MAX_HARVESTERS = 11;
var MAX_BUILDERS = 4;
var MAX_GUARDS = 2;
var MAX_JANITORS = 2;

var currentHarvesters = 0;
var currentBuilders = 0;
var currentGuards = 0;
var currentJanitors = 0;
var currentHealers = 0;
var currentArchers = 0;

var RETREAT = true;
var allCreeps = utils.countCreeps();




if (Memory.init === undefined || Memory.init === false) {
    init();
    Memory.init = true;
}

for(var name in Game.creeps) {
	var creep = Game.creeps[name];

	if(creep.memory.role == 'harvester') {
	    currentHarvesters += 1;
		harvester(creep);
	}

	if(creep.memory.role == 'builder') {
	    currentBuilders += 1;
        builder(creep);
	}
	
	if(creep.memory.role == 'guard') {
	    currentGuards += 1;
	    guard(creep);
    }
	
	if(creep.memory.role == 'janitor') {
	    currentJanitors += 1;
	    janitor(creep);
    }
    
    if(creep.memory.role === 'healer') {
        currentHealers += 1;
        healer(creep)
    }
    
    if(creep.memory.role === 'archer') {
        currentArchers += 1;
        archer(creep);
    }
}

for (var i = 0; i < Memory.sources.length; i++) {
    miner(Memory.sources[i]);
}

/*
//start with harvesters for the close one
if (currentHarvesters < 3) {
    Game.spawns.Spawn1.createCreep( [Game.WORK, Game.CARRY, Game.MOVE], utils.getName('Harvester'), { role: 'harvester', primarySource: 0 });
}
*/

//1 miner and 1 courier
if (Memory.sources[0].miners.length < 2 || Memory.sources[0].couriers.length < 1) {
    utils.spawnForSource(Memory.sources[0]);
} 

// 2 ranged
else if (currentArchers < 1) {
    Game.spawns.Spawn1.createCreep( [Game.MOVE, Game.RANGED_ATTACK, Game.MOVE, Game.RANGED_ATTACK, Game.MOVE], utils.getName('Archer'), { role: 'archer' } );
}
// let's build stuff!
else if (currentBuilders < 1) {
    Game.spawns.Spawn1.createCreep( [Game.WORK, Game.CARRY, Game.MOVE], utils.getName('Builder'), { role: 'builder', primarySource: 1 });
} 
else if (currentHarvesters < 2) {
    Game.spawns.Spawn1.createCreep( [Game.WORK, Game.CARRY, Game.MOVE], utils.getName('Harvester'), { role: 'harvester', primarySource: 1 });
}
// 2 ranged
else if (currentArchers < 3) {
    Game.spawns.Spawn1.createCreep( [Game.RANGED_ATTACK, Game.MOVE], utils.getName('Archer'), { role: 'archer' } );
}

//1 healer
else if (currentHealers < 1) {
    Game.spawns.Spawn1.createCreep( [Game.HEAL, Game.MOVE], utils.getName('Healer'), { role: 'healer' } );
} 
//Site 3:  1 miners, 1 couriers (site 3 complete)
else if (Memory.sources[3].miners.length < 1|| Memory.sources[3].couriers.length < 1) {
    utils.spawnForSource(Memory.sources[3]);
} 
// 4 ranged
else if (currentArchers < 4) {
    Game.spawns.Spawn1.createCreep( [Game.RANGED_ATTACK, Game.MOVE], utils.getName('Archer'), { role: 'archer' } );
}
// 4 harvesters
else if (currentHarvesters < 4) {
    Game.spawns.Spawn1.createCreep( [Game.WORK, Game.CARRY, Game.MOVE], utils.getName('Harvester'), { role: 'harvester', primarySource: 1 });
}
//2 healers
else if (currentHealers < 2) {
    Game.spawns.Spawn1.createCreep( [Game.HEAL, Game.MOVE], utils.getName('Healer'), { role: 'healer' } );
} 
else if (true) {
    Game.spawns.Spawn1.createCreep( [Game.MOVE, Game.RANGED_ATTACK, Game.MOVE, Game.RANGED_ATTACK, Game.MOVE], utils.getName('Archer'), { role: 'archer' } );
}

/*
//1 guard
else if (currentGuards < 1) {
    Game.spawns.Spawn1.createCreep( [Game.MOVE, Game.ATTACK, Game.MOVE, Game.ATTACK, Game.MOVE], utils.getName('Guard'), { role: 'guard' } );
} 
*/
/*
//2 miner, 1 courier
else if (Memory.sources[0].miners.length < 2 || Memory.sources[0].couriers.length < 1) {
    utils.spawnForSource(Memory.sources[0]);
} 
*/
/*
//2 guards
else if (currentGuards < 2) {
    Game.spawns.Spawn1.createCreep( [Game.MOVE, Game.ATTACK, Game.MOVE, Game.ATTACK, Game.MOVE], utils.getName('Guard'), { role: 'guard' } );
} 
*/
/*
// 2 miners, 2 couriers (site 0 complete)
else if (Memory.sources[0].miners.length < 2 || Memory.sources[0].couriers.length < 2) {
    utils.spawnForSource(Memory.sources[0]);
} 
*/
/*
if (currentHarvesters < MAX_HARVESTERS) {
    Game.spawns.Spawn1.createCreep( [Game.WORK, Game.CARRY, Game.WORK, Game.MOVE, Game.MOVE], utils.getName('Harvester'), { role: 'harvester', primarySource: config.harvesterSource[currentHarvesters] });
} else if (currentGuards < MAX_GUARDS) {
    Game.spawns.Spawn1.createCreep( [Game.MOVE, Game.ATTACK, Game.MOVE, Game.ATTACK, Game.MOVE], utils.getName('Guard'), { role: 'guard' } );
} else if (currentBuilders < MAX_BUILDERS) {
    Game.spawns.Spawn1.createCreep( [Game.WORK, Game.CARRY, Game.WORK, Game.MOVE, Game.MOVE], utils.getName('Builder'), { role: 'builder', primarySource: 4 });
} else if (currentJanitors < MAX_JANITORS) {
    Game.spawns.Spawn1.createCreep( [Game.WORK, Game.CARRY, Game.WORK, Game.CARRY, Game.MOVE], utils.getName('Janitor'), { role: 'janitor' });
}
*/