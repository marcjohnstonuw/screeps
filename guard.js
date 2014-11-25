var config = require('config');
module.exports = function (creep) {
	var target = creep.pos.findNearest(Game.HOSTILE_CREEPS);
	if(target && creep.getActiveBodyparts(Game.ATTACK) && !config.RETREAT) {
		creep.moveTo(target);
		creep.attack(target);
	} else {
	    creep.moveTo(23, 24)
	}
}