var config = require('config');
module.exports = function (creep) {
	var target = creep.pos.findNearest(Game.HOSTILE_CREEPS);
	if(target && creep.getActiveBodyparts(Game.ATTACK)) {
		if (config.RETREAT) {
			creep.moveTo(target, {withinRampartsOnly: true});
		} else {
			creep.moveTo(target);
		}
		creep.attack(target);
	} else {
		if (config.RETREAT) {
			console.log('moving?' + creep.moveTo(25, 26, {withinRampartsOnly: true}))
		    if (creep.moveTo(25, 26, {withinRampartsOnly: true}) < 0) {
		    	creep.moveTo(25, 26)	
		    }
		} else {
			creep.moveTo(25, 26)
		}
	}
}