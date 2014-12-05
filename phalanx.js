var utils = require('utils');
module.exports = function (phalanxInfo) {

	if (phalanxInfo.archers[0]) {
		Game.creeps[phalanxInfo.archers[0]].moveTo(utils.getPositionInDirection(
			phalanxInfo.destination,
			phalanxInfo.direction,
			1
		), {ignoreCreeps: true});
	}
	if (phalanxInfo.archers[1]) {
		var archer1Move = Game.creeps[phalanxInfo.archers[1]].moveTo(utils.getPositionInDirection(
			phalanxInfo.destination,
			utils.getDirectionClockwise(phalanxInfo.direction, 2),
			1
		), {ignoreCreeps: true});
		console.log('archer 1 :' + archer1Move);
	}
	if (phalanxInfo.archers[2]) {
		Game.creeps[phalanxInfo.archers[2]].moveTo(utils.getPositionInDirection(
			phalanxInfo.destination,
			utils.getDirectionClockwise(phalanxInfo.direction, -2),
			1
		), {ignoreCreeps: true});
	}
	if (phalanxInfo.healers[0]) {
		var healerMove = Game.creeps[phalanxInfo.healers[0]].moveTo(phalanxInfo.destination, {ignoreCreeps: true});
		//console.log('healerMove' + healerMove);
	} 
	/*
	for (var i = 0; i < phalanxInfo.archers; i++) {
		switch(i) {
			case 0;
				phalanxInfo.
		}
	}
	*/
}