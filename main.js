var harvester = require('harvester');
var builder = require('builder');
var guard = require('guard');
var janitor = require('janitor');
var config = require('config');
var utils = require('utils');
//elderly pwnage
var MAX_HARVESTERS = 11;
var MAX_BUILDERS = 4;
var MAX_GUARDS = 2;
var MAX_JANITORS = 2;

var currentHarvesters = 0;
var currentBuilders = 0;
var currentGuards = 0;
var currentJanitors = 0;

var allCreeps = utils.countCreeps();

for(var name in Game.creeps) {
    console.log(name)
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
}


if (currentHarvesters < MAX_HARVESTERS) {
    Game.spawns.Spawn1.createCreep( [Game.WORK, Game.CARRY, Game.WORK, Game.MOVE, Game.MOVE], utils.getName('Harvester'), { role: 'harvester', primarySource: config.harvesterSource[currentHarvesters] });
} else if (currentGuards < MAX_GUARDS) {
    Game.spawns.Spawn1.createCreep( [Game.MOVE, Game.ATTACK, Game.MOVE, Game.ATTACK, Game.MOVE], utils.getName('Guard'), { role: 'guard' } );
} else if (currentBuilders < MAX_BUILDERS) {
    Game.spawns.Spawn1.createCreep( [Game.WORK, Game.CARRY, Game.WORK, Game.MOVE, Game.MOVE], utils.getName('Builder'), { role: 'builder', primarySource: 4 });
} else if (currentJanitors < MAX_JANITORS) {
    Game.spawns.Spawn1.createCreep( [Game.WORK, Game.CARRY, Game.WORK, Game.CARRY, Game.MOVE], utils.getName('Janitor'), { role: 'janitor' });
}
