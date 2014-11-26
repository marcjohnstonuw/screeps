var config = require('config');

module.exports = function (creep) {
	var target = creep.pos.findNearest(Game.HOSTILE_CREEPS, {ignoreCreeps: true});
	if(target !== null && creep.getActiveBodyparts(Game.RANGED_ATTACK) && !config.TURTLE) {
		var path = creep.pos.findPathTo(target, {ignoreCreeps: true})
		if (path.length <= 2) {
			var towards = path[0].direction;
			var away = ((towards + 3) % 8) + 1;
			var res = creep.rangedAttack(target);
			console.log('kite?' + res);
			creep.move(away);
		}
		else if (path.length >= 3) {
			var res = creep.rangedAttack(target)
			if (res === Game.ERR_NOT_IN_RANGE) {
				console.log(creep.name + 'CLOSING IN');
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