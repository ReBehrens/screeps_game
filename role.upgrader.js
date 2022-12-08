//TESTING
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep, room, HQ, room2) {
        // If the creep is upgrading and is empty
        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {

            // Set upgrading to false and say so
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }

        // Otherwise if the creep is not upgrading but is full
        else if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {

            // Set upgrading to true and say so
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        // This is having the creep operate based on the upgrading state

        // If the creep is upgrading
        if (creep.memory.upgrading) {

            // Try to upgrade the controller. If not in range
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {

                // Move to it
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        } else {

            const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: resource => resource.resourceType == RESOURCE_ENERGY
            })
            
            let mines = creep.room.find(FIND_SOURCES);
            
            // Find the closest energy on the ground
            const closestDroppedEnergy = creep.pos.findClosestByRange(droppedEnergy)
            
            if(closestDroppedEnergy) {
            // Try to pickup the energy. If it's not in range
               if (creep.pickup(closestDroppedEnergy) == ERR_NOT_IN_RANGE) {
            
                    // Move to it
                    creep.moveTo(closestDroppedEnergy, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            } else {

                
            //if the creep empty, search full containers
            
                let sources = creep.room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_STORAGE &&
                i.store[RESOURCE_ENERGY] > 0});
                
                if(creep.store.getFreeCapacity() > 0) {
                    //get Energy out from container    
                    if(creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
           
            
        }
    }
    
    }
};

module.exports = roleUpgrader;