module.exports = function (creep) {
	var target = creep.pos.findNearest(Game.HOSTILE_CREEPS);
	if(target !== null && creep.getActiveBodyparts(Game.RANGED_ATTACK)) {
		var path = creep.pos.findPathTo(target)
		if (path.length <= 2) {
			var towards = path[0].direction;
			var away = ((towards + 3) % 8) + 1;
			creep.rangedAttack(target)
			creep.move(away);
		}
		else if (path.length >= 2) {
			var res = creep.rangedAttack(target)
			if (res === Game.ERR_NOT_IN_RANGE) {
			    creep.moveTo(target);
			}
		}
	} else {
	    creep.moveTo(24, 24)
	}
}