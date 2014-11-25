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
        currentArcher += 1;
        archer(creep);
    }
}

for (var i = 0; i < Memory.sources.length; i++) {
    miner(Memory.sources[i]);
}

//1 miner and 1 courier
if (Memory.sources[0].miners.length < 1 || Memory.sources[0].couriers.length < 1) {
    utils.spawnForSource(Memory.sources[0]);
} 
//1 guard
else if (currentGuards < 1) {
    Game.spawns.Spawn1.createCreep( [Game.MOVE, Game.ATTACK, Game.MOVE, Game.ATTACK, Game.MOVE], utils.getName('Guard'), { role: 'guard' } );
} 
//2 miner, 1 courier
else if (Memory.sources[0].miners.length < 2 || Memory.sources[0].couriers.length < 1) {
    utils.spawnForSource(Memory.sources[0]);
} 
//2 guards
else if (currentGuards < 2) {
    Game.spawns.Spawn1.createCreep( [Game.MOVE, Game.ATTACK, Game.MOVE, Game.ATTACK, Game.MOVE], utils.getName('Guard'), { role: 'guard' } );
} 
//1 healer
else if (currentHealers < 1) {
    Game.spawns.Spawn1.createCreep( [Game.TOUGH, Game.MOVE, Game.HEAL, Game.MOVE], utils.getName('Healer'), { role: 'healer' } );
} 
// 2 miners, 2 couriers (site 0 complete)
else if (Memory.sources[0].miners.length < 2 || Memory.sources[0].couriers.length < 2) {
    utils.spawnForSource(Memory.sources[0]);
} 
//3 guards
else if (currentGuards < 3) {
    Game.spawns.Spawn1.createCreep( [Game.MOVE, Game.ATTACK, Game.MOVE, Game.ATTACK, Game.MOVE], utils.getName('Guard'), { role: 'guard' } );
} 
//2 healers
else if (currentHealers < 2) {
    Game.spawns.Spawn1.createCreep( [Game.TOUGH, Game.MOVE, Game.HEAL, Game.MOVE], utils.getName('Healer'), { role: 'healer' } );
} 
//Site 1:  1 miners, 1 couriers (site 1 complete)
else if (Memory.sources[1].miners.length < 21|| Memory.sources[1].couriers.length < 1) {
    utils.spawnForSource(Memory.sources[1]);
} 
// 5 guards
else if (currentGuards < 5) {
    Game.spawns.Spawn1.createCreep( [Game.MOVE, Game.ATTACK, Game.MOVE, Game.ATTACK, Game.MOVE], utils.getName('Guard'), { role: 'guard' } );
} 
// 3 ranged
else if (currentArchers < 3) {
    Game.spawns.Spawn1.createCreep( [Game.MOVE, Game.RANGED_ATTACK, Game.MOVE, Game.RANGED_ATTACK, Game.MOVE], utils.getName('Archer'), { role: 'archer' } );
}
// 2 miners, 3 couriers (site 1 complete)
else if (Memory.sources[1].miners.length < 2 || Memory.sources[1].couriers.length < 3) {
    utils.spawnForSource(Memory.sources[1]);
} 
// let's build stuff!
else if (currentBuilders < 2) {
    Game.spawns.Spawn1.createCreep( [Game.WORK, Game.CARRY, Game.WORK, Game.MOVE, Game.MOVE], utils.getName('Builder'), { role: 'builder', primarySource: 4 });
} 
// site 2 complete
else if (Memory.sources[2].miners.length < 2 || Memory.sources[2].couriers.length < 3) {
    utils.spawnForSource(Memory.sources[2]);
} 
// site 3 complete
else if (Memory.sources[3].miners.length < 1 || Memory.sources[3].couriers.length < 1) {
    utils.spawnForSource(Memory.sources[3]);
} 
// site 4 complete
else if (Memory.sources[4].miners.length < 2 || Memory.sources[4].couriers.length < 3) {
    utils.spawnForSource(Memory.sources[4]);
} else if (true) {

}

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