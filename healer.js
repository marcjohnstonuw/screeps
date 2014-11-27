var utils = require('utils');
module.exports = function (creep) {
    var fighters = [];
    var others = [];
    var lowHealth = 999999;
    var lowIndex;
    if (creep.memory.healToMax) {
        if (Game.creeps[creep.memory.healToMax] && Game.creeps[creep.memory.healToMax].hits < Game.creeps[creep.memory.healToMax].hitsMax) {
            lowIndex = creep.memory.healToMax;
        }
        else {
            creep.memory.healToMax = null;
        }
    }
    if (!creep.memory.healToMax) {
        for(var name in Game.creeps) {
        	var c = Game.creeps[name];
        	
        	if (c.memory.role === 'guard' || c.memory.role === 'archer' || c.memory.role === 'healer') {
                if (c.name !== creep.name) {
            	    fighters.push(c);
                } else {
                    continue;
                }
                console.log('hits :' + (c.hits - (c.hits % 100)) < lowHealth + ' lowHealth' + lowHealth);
        	    if (c.hits < c.hitsMax && (c.hits - (c.hits % 100)) < lowHealth) {
        	        lowHealth = (c.hits - (c.hits % 100));
        	        lowIndex = name;

                    if (c.hits < 100) {
                        console.log('*** gonna heal :' + lowIndex + ' forever!');
                        creep.memory.healToMax = lowIndex;
                    }
        	    }
        	} else {
                others.push(c) 
            }
        }
    }
    var targets = creep.pos.findInRange(Game.HOSTILE_CREEPS, 3);
    var hasRanged = false;
    for (var i = 0; i < targets.length; i++) {
        if (targets[i].getActiveBodyparts(Game.RANGED_ATTACK) > 0) {
            hasRanged = true;
        }
    }
    if (!hasRanged) {
        targets = creep.pos.findInRange(Game.HOSTILE_CREEPS, 1);
    }
    if (targets !== null && targets.length > 0) { //OH FUCK
        console.log('healer out');
        utils.bail(creep, targets[0]);
    }
    else if (lowIndex !== undefined && creep.getActiveBodyparts(Game.HEAL)) {
        console.log('healing :' + lowIndex + ' at position :' + Game.creeps[lowIndex].pos + ' path:' + JSON.stringify(creep.pos.findPathTo(Game.creeps[lowIndex])));
        creep.moveTo(Game.creeps[lowIndex]);
        creep.heal(Game.creeps[lowIndex]);
    } else if (fighters.length > 0) {
        console.log('hangin with fighters 0')
        creep.moveTo(fighters[0]);
    } else {
        creep.moveTo(24, 26);
    }
}