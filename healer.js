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
    
    if (lowIndex !== undefined && creep.getActiveBodyparts(Game.HEAL)) {
        creep.moveTo(Game.creeps[lowIndex]);
        creep.heal(Game.creeps[lowIndex]);
    } else if (guards.length > 0) {
        creep.moveTo(guards[0]);
    } else {
        creep.moveTo(20, 20);
    }
}