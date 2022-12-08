//TESTING
var roleHauler2 = {

    /** @param {Creep} creep **/
    run: function(creep, room, HQ, room2) {
        
        // If the hauler isn't full

        if(creep.store[RESOURCE_ENERGY] == 0) {

            // Find energy on the ground
            const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: resource => resource.resourceType == RESOURCE_ENERGY
            })
            //if the creep empty, search full containers
            const sources = creep.room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_CONTAINER});

            // Find the closest energy on the ground
            const closestDroppedEnergy = creep.pos.findClosestByRange(droppedEnergy)

            if(closestDroppedEnergy) {
            // Try to pickup the energy. If it's not in range
               if (creep.pickup(closestDroppedEnergy) == ERR_NOT_IN_RANGE) {

                    // Move to it
                    creep.moveTo(closestDroppedEnergy, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            } 
            
            // if creep empty, get Energy from Container
            else if(sources.length){
                if(creep.store.getFreeCapacity() > 0) {
                    //get Energy out from container    
                    if(creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            }
                // if Storage is empty and the Harvester is die 
        } else {

            // Find Structure in the room
            const target = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER)
                && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 ;
            }});

            if(target[0]) {
                if(creep.transfer(target[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    //go to
                    creep.moveTo(target[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }

            }
            
             if(!target[0]) {        
                let target2 = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE)
                }});

            
                if(creep.transfer(target2[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    //go to
                    creep.moveTo(target2[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
                
                   
            } 
        }
    }
};

module.exports = roleHauler2;