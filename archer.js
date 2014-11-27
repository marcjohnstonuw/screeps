var utils = require('utils');
var config = require('config');
var STAGING = {x: 27, y: 35};

module.exports = function (creep) {
	var target = creep.pos.findNearest(Game.HOSTILE_CREEPS, {ignoreCreeps: true});
	if(target !== null && !config.TURTLE) {
		var path = creep.pos.findPathTo(target, {ignoreCreeps: true})
		if (creep.getActiveBodyparts(Game.RANGED_ATTACK)) {
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
			if (path.length > 3) {
				var healers = creep.pos.findNearest(Game.MY_CREEPS, {ignoreCreeps: true}), {
				    filter: function(object) {
				        return object.getActiveBodyparts(Game.HEAL) > 0;
				    }
				});
				if (healers.length) {
					creep.moveTo(healers[0]);
				} else {
					creep.moveTo(24, 26);
				}
			} else {
				utils.bail(creep, target);
			}
		}
	} else {
	    creep.moveTo(STAGING)
		if (target) {
			creep.rangedAttack(target)
		}
	}
}