//TESTING
var roleBuilder = require('role.builder');
var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep, room, HQ, room2) {
        
		if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 Pickup');
	    }
	    if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
	        creep.memory.repairing = true;
	        creep.say('🚧 Repairing');
	    }

	    if(creep.memory.repairing) {

            




	        
            
            //get Damaged structures
            let repairTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax 
                && (structure.structureType != STRUCTURE_WALL 
                && structure.structureType != STRUCTURE_RAMPART)});
            
            
            
            //if Structures damaged and no constructions sites available, repair the damage
            if(repairTargets.length) {
                if(creep.repair(repairTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairTargets[0], {visualizePathStyle: { stroke: '#f4925d'}})
                    
                } 
            }
            else {
                //if dont excist damaged buldings then do building .... or upgradin the controller
                roleBuilder.run(creep);
            }
        
            

	    } else {
            // Find energy on the ground
            const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: resource => resource.resourceType == RESOURCE_ENERGY
            })
            //if the creep empty, search full containers
            const resource = creep.room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_CONTAINER});

            // Find the closest energy on the ground
            const closestDroppedEnergy = creep.pos.findClosestByRange(droppedEnergy)

            if(closestDroppedEnergy) {
            // Try to pickup the energy. If it's not in range
               if (creep.pickup(closestDroppedEnergy) == ERR_NOT_IN_RANGE) {

                    // Move to it
                    creep.moveTo(closestDroppedEnergy, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            } 
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
};

module.exports = roleRepairer;
