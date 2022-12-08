//TESTING
function roomDefense(room, towerRepair) {
    
    //Search for towers
    var towers = room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_TOWER }});
    //if Towers found in this room
    if(towers.length) {
        _.forEach(towers, function(tower) {
        
            const healCreep = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
                 filter: function(creep) { return creep.hits < creep.hitsMax
            }});

            let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

            //if enemycreep found
            if(closestHostile) {
                tower.attack(closestHostile);
            }

            //if creap need help
            if(healCreep) {
                tower.heal(healCreep);
            }

            //if the repair-setting true
            if(towerRepair == true) {
            
            //if Structures Damaged, Repair it
            let closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL
                                                                          && structure.structureType != STRUCTURE_RAMPART});

                if(closestDamagedStructure) {
                    tower.repair(closestDamagedStructure);
                }
            }
        })
    }




};

module.exports = roomDefense;