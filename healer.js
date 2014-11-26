module.exports = function (creep) {
    var guards = [];
    var lowHealth = 999999;
    var lowIndex;
    for(var name in Game.creeps) {
    	var c = Game.creeps[name];
    	
    	if (c.memory.role === 'guard' || c.memory.role === 'healer') {
    	    guards.push(c);
    	    if (c.hits < c.hitsMax && c.hits < lowHealth) {
    	        lowHealth = c.hits;
    	        lowIndex = name;
    	    }
    	}
    }
    var targets = creep.pos.findInRange(Game.HOSTILE_CREEPS, 4);
    var hasRanged = false;
    for (var i = 0; i < targets.length; i++) {
        if (targets[i].getActiveBodyparts(Game.RANGED_ATTACK) > 0) {
            hasRanged = true;
        }
    }
    if (hasRanged) {
        targets = creep.pos.findInRange(Game.HOSTILE_CREEPS, 1);
    }
    if (targets !== null && targets.length > 0) { //OH FUCK
        utils.bail(creep, targets[0]);
    }
    else if (lowIndex !== undefined && creep.getActiveBodyparts(Game.HEAL)) {
        creep.moveTo(Game.creeps[lowIndex]);
        creep.heal(Game.creeps[lowIndex]);
    } else if (guards.length > 0) {
        creep.moveTo(guards[0]);
    } else {
        creep.moveTo(24, 26);
    }
}