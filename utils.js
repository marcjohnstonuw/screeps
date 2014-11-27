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

function getPositionInDirection (pos, direction, distance) {
    var d = direction - 1;
    var dy = 0;
    var dx = 0;
    if (d === 0 || d === 1 || d === 7) {
        dy = -1;
    }
    if (d === 4 || d === 5 || d === 3) {
        dy = 1;
    }
    if (d === 1 || d === 2 || d === 3) {
        dx = 1;
    }
    if (d === 5 || d === 6 || d === 7) {
        dx = -1;
    }
    console.log('d:' + d + ' dx:' + dx + ' dy:' + dy);
    console.log('gPID returning :' + JSON.stringify({x: pos.x + (dx * distance), y: pos.y + (dy * distance)}))
    return {x: pos.x + (dx * distance), y: pos.y + (dy * distance)};
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
    },

    bail: function (creep, threat) {
        console.log('creep:' + creep)
        var spawn = creep.pos.findNearest(Game.MY_SPAWNS);
        if (spawn === null) {
            console.log('whar home?');
            return;
        }
        var home = creep.pos.findPathTo(spawn);
        if (home.length === 0) {
            console.log(creep.name + ' cant get home :(')
            return;
        } else {
            var homeDirection = home[0].direction;
            var path = creep.pos.findPathTo(threat)
            if (path.length === 0) {
                console.log('jammed up :(');
                return;
            }
            var towards = path[0].direction;
            var away = ((towards + 3) % 8) + 1;
            if (homeDirection === towards) {
                homeDirection = (homeDirection === 1) ? 8 : homeDirection - 1;
            }
            else if (homeDirection === (towards - 1) || homeDirection === (towards + 7)) {
                homeDirection = (homeDirection === 8) ? 1 : homeDirection + 1;
            } else if (homeDirection === (towards + 1) || homeDirection === (towards - 7)) {
                homeDirection = (homeDirection === 1) ? 8 : homeDirection - 1;;
            }
            console.log('creep :' + creep.name + ' is bailing in direction :' + homeDirection);
            creep.moveTo(getPositionInDirection(creep.pos, homeDirection, 2));
        }
    },

    getPositionInDirection: getPositionInDirection,

    kite: function (creep, direction) {
        console.log('direction :' + direction);
        console.log('creep :' + creep + ' pos :' + creep.pos);
        creep.moveTo(getPositionInDirection(creep.pos, direction, 2));
    }
}
//dicks