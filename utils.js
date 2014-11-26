function getName (base) {
    var i = 0;
    while (i < 9999) {
        if (Game.creeps[base + i] === undefined) {
            return base + i;
        }
        i += 1;
    }
    return 'God';
}

module.exports = {
    countCreeps: function () {
        var ret = { fastWorkers: 0, slowWorkers: 0, melee: 0, ranged: 0, healer: 0 };
        for (var name in Game.creeps) {
            switch (Game.creeps[name].memory.type) {
                case 'fastWorker':
                    ret.fastWorkers += 1;
                    break;
                case 'slowWorker':
                    ret.slowWorkers += 1;
                    break;
                case 'melee':
                    ret.melee += 1;
                    break;
                case 'ranged':
                    ret.ranged += 1;
                    break;
                case 'healer':
                    ret.healer += 1;
                    break;
            }
        }
        return ret;
    },
    
    getName: getName,
    
    checkPopulation: function () {
        if (currentHarvesters < MAX_HARVESTERS) {
            Game.spawns.Spawn1.createCreep( [Game.WORK, Game.CARRY, Game.WORK, Game.MOVE, Game.MOVE], utils.getName('Harvester'), { role: 'harvester', primarySource: config.harvesterSource[currentHarvesters] });
        } else if (currentGuards < MAX_GUARDS) {
            Game.spawns.Spawn1.createCreep( [Game.MOVE, Game.ATTACK, Game.MOVE, Game.ATTACK, Game.MOVE], utils.getName('Guard'), { role: 'guard' } );
        } else if (currentBuilders < MAX_BUILDERS) {
            Game.spawns.Spawn1.createCreep( [Game.WORK, Game.CARRY, Game.WORK, Game.MOVE, Game.MOVE], utils.getName('Builder'), { role: 'builder', primarySource: 4 });
        } else if (currentJanitors < MAX_JANITORS) {
            Game.spawns.Spawn1.createCreep( [Game.WORK, Game.CARRY, Game.WORK, Game.CARRY, Game.MOVE], utils.getName('Janitor'), { role: 'janitor' });
        }
    },
    
    getNeighbourhood: function (pos) {
        var ret = [];
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                if (!(i === 0 && j === 0)) {
                    ret.push({x: pos.x + i, y: pos.y + j, roomName: pos.roomName});
                }
            }
        }
        return ret;
    },
    
    spawnForSource: function (source) {
        if (source.miners.length < 1) {
            var resp = Game.spawns.Spawn1.createCreep( 
                [Game.WORK, Game.WORK, Game.CARRY, Game.CARRY, Game.MOVE], 
                getName('Miner'), 
                { role: 'miner', primarySource: source.id }
            );
            if (typeof(resp) === 'string') {
                source.miners.push(resp);
            }
            return;
        } else if (source.couriers.length < 1) {
            var resp = Game.spawns.Spawn1.createCreep( 
                [Game.CARRY, Game.MOVE, Game.CARRY, Game.MOVE], 
                getName('Courier'), 
                { role: 'courier', primarySource: source.id }
            );
            if (typeof(resp) === 'string') {
                source.couriers.push(resp);
            }
            return;
        } else if (source.miners.length < 2) {
            var resp = Game.spawns.Spawn1.createCreep( 
                [Game.WORK, Game.WORK, Game.CARRY, Game.CARRY, Game.MOVE], 
                getName('Miner'), 
                { role: 'miner', primarySource: source.id }
            );
            if (typeof(resp) === 'string') {
                source.miners.push(resp);
            }
            return;
        } else if (source.couriers.length < 3) {
            var resp = Game.spawns.Spawn1.createCreep( 
                [Game.CARRY, Game.MOVE, Game.CARRY, Game.MOVE], 
                getName('Courier'), 
                { role: 'courier', primarySource: source.id }
            );
            if (typeof(resp) === 'string') {
                source.couriers.push(resp);
            }
            return;
        }
    }
}
//dicks