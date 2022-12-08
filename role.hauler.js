//TESTUNG

var roleHauler2 = require('role.hauler2');

var roleHauler = {

    /** @param {Creep} creep **/
    run: function(creep, room, HQ, room2) {

        


        // If the hauler isn't full
        if(creep.store[RESOURCE_ENERGY] == 0) {



            

            //if the creep empty, search full containers
            let resource = creep.room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                i.store[RESOURCE_ENERGY] > 0
            });
            console.log('0: ' + resource[0] + room);
            if (resource[0] == undefined) {
            resource = creep.room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_STORAGE &&
                i.store[RESOURCE_ENERGY] > 0
            });
            }
            
            //get Energy out from container    
            if(creep.withdraw(resource[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(resource[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            
            
                // if Storage is empty and the Harvester is die    
           
        } else {
            // Find Structure in the room
            
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => (structure.structureType == STRUCTURE_SPAWN
                                    || structure.structureType == STRUCTURE_EXTENSION)
                                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0});
                        
            console.log('1: ' + targets[0]);
            // try to Transfer energy to the Target. if not works
            if (targets[0] != undefined) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    //go to
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                    let target2 = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => (structure.structureType == STRUCTURE_STORAGE)
                        
                    });

                    console.log('2: ' + target2[0]);
                    if (creep.transfer(target2[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        //go to
                        creep.moveTo(target2[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
                
            }
        }
    }
};

module.exports = roleHauler;