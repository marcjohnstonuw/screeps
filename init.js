var utils = require('utils');

module.exports = function () {
    Memory.sources = [];
    Memory.phalanxes = [];
    for (var spawn in Game.spawns) { 
        var sources = Game.spawns.Spawn1.room.find(Game.SOURCES);
        
        for (var source in sources) {
            //console.log('pos :' + sources[source].pos)
            var room = sources[source].room;
            var neighbourhood = utils.getNeighbourhood(sources[source].pos);
            var minerLocations = [];
            for (var pos in neighbourhood) {
                var tile = room.lookAt(neighbourhood[pos]);
                if (tile.length === 0) {
                    //console.log('added !!!!:' + JSON.stringify(tile[thing]));
                    minerLocations.push(neighbourhood[pos]);
                } else {
                    for (var thing in tile) {
                        //console.log('thing :' + tile[thing].terrain);
                        if (tile[thing].type === 'terrain' && (tile[thing].terrain === 'plain' || tile[thing].terrain === 'swamp')) {
                            //console.log('marshed !!!!:' + JSON.stringify(tile[thing]));
                            minerLocations.push(neighbourhood[pos]);
                            break;
                        }
                    }
                }
                if (minerLocations.length >= 3) {
                    break;
                }
            }
            
            Memory.sources.push({id: parseInt(source), minerLocations: minerLocations, miners: [], couriers: []})
        }
        
        break;  //for loop of 1
    }

    //32, 35
    //10, 25
    var phalanxPositions = [{x: 32, y: 35}, {x: 10, y: 25}];
    for (var i = 0; i < phalanxPositions.length; i++) {
        var phalanx = {};
        phalanx.staging = phalanxPositions[i];
        phalanx.destination = phalanx.staging;
        phalanx.healers = [];
        phalanx.archers = [];
        phalanx.direction = Game.BOTTOM;
        Memory.phalanxes.push(phalanx);
    }
};