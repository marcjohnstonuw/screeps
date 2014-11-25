module.exports = function (creep) {
	var targets = creep.room.find(Game.HOSTILE_CREEPS);
	if(targets.length && creep.getActiveBodyparts(Game.RANGED_ATTACK)) {
		var res = creep.rangedAttack(targets[0])
		if (res === Game.ERR_NOT_IN_RANGE) {
		    creep.moveTo(targets[0]);
		}
	} else {
	    creep.moveTo(20, 22)
	}
}