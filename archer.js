var config = require('config');

module.exports = function (creep) {
	var target = creep.pos.findNearest(Game.HOSTILE_CREEPS);
	if(target !== null && creep.getActiveBodyparts(Game.RANGED_ATTACK) && !config.TURTLE) {
		var path = creep.pos.findPathTo(target)
		if (path.length <= 2) {
			var towards = path[0].direction;
			var away = ((towards + 3) % 8) + 1;
			creep.rangedAttack(target)
			creep.move(away);
		}
		else if (path.length >= 3) {
			var res = creep.rangedAttack(target)
			if (res === Game.ERR_NOT_IN_RANGE) {
			    creep.moveTo(target, {ignoreCreeps: true});
			}
		}
	} else {
	    creep.moveTo(24, 24)
		if (target) {
			creep.rangedAttack(target)
		}
	}
}