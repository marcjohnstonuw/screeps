var utils = require('utils');
var config = require('config');
var STAGING = {x: 27, y: 35};

module.exports = function (creep) {
	//if (creep.memory.phalanx) {
		return;
	//}
	var target = creep.pos.findNearest(Game.HOSTILE_CREEPS, {ignoreCreeps: true});
	if(target !== null && !config.TURTLE) {
		if (creep.getActiveBodyparts(Game.RANGED_ATTACK)) {
			var path = creep.pos.findPathTo(target, {ignoreCreeps: true})
			if (path.length <= 2) {
				var towards = path[0].direction;
				var away = ((towards + 3) % 8) + 1;
				var res = creep.rangedAttack(target);
				console.log('kite?' + res);
				utils.kite(creep, away);
			}
			else if (path.length >= 3) {
				var res = creep.rangedAttack(target)
				if (res === Game.ERR_NOT_IN_RANGE) {
					console.log(creep.name + 'CLOSING IN');
				    creep.moveTo(target);//TODO: for shooting over walls, check the distance (direct tiles) and move smart
				}
			}
		} else {
			utils.bail(creep, target);
		}
	} else {
	    creep.moveTo(STAGING)
		if (target) {
			creep.rangedAttack(target)
		}
	}
}