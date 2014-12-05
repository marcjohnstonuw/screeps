var utils = require('utils');
module.exports = function (creep) {
    if (creep.memory.phalanx) {
        return;
    }
    var fighters = [];
    var lowHealth = 999999;
    var lowIndex;
    for(var name in Game.creeps) {
    	var c = Game.creeps[name];
    	
    	if (c.memory.role === 'guard' || c.memory.role === 'archer' || c.memory.role === 'healer') {
            if (c.name !== creep.name) {
        	    fighters.push(c);
            }
    	    if (c.hits < c.hitsMax && c.hits < lowHealth) {
    	        lowHealth = c.hits;
    	        lowIndex = name;
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
        //console.log('healing :' + lowIndex + ' at position :' + Game.creeps[lowIndex].pos + ' path:' + JSON.stringify(creep.pos.findPathTo(Game.creeps[lowIndex])));
        creep.moveTo(Game.creeps[lowIndex]);
        creep.heal(Game.creeps[lowIndex]);
    } else if (fighters.length > 0) {
        creep.moveTo(fighters[0]);
    } else {
        creep.moveTo(24, 26);
    }
}