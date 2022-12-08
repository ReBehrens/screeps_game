//TESTING
var roleUpgrader = require('role.upgrader');

module.exports = {

    /** @param {Creep} creep **/
    run: function(creep, room, HQ, room2) {
    
        creep.moveTo(game.flags.aSpot);

		if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 Pickup');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        
            //get construction sites
            let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            
        
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
            roleUpgrader.run(creep);
            }

	    } else {

            const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: resource => resource.resourceType == RESOURCE_ENERGY
            })
            
            
            
            // Find the closest energy on the ground
            const closestDroppedEnergy = creep.pos.findClosestByRange(droppedEnergy)
            
            if(closestDroppedEnergy) {
            // Try to pickup the energy. If it's not in range
               if (creep.pickup(closestDroppedEnergy) == ERR_NOT_IN_RANGE) {
            
                    // Move to it
                    creep.moveTo(closestDroppedEnergy, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            } else {


                if(room.name == HQ) {
                    let sources = creep.room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_STORAGE &&
                    i.store[RESOURCE_ENERGY] > 0});
                    
                    if(creep.store.getFreeCapacity() > 0) {
                        //get Energy out from container    
                        if(creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    }
                } else if(room.name == room2){
                    let sources = creep.room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                        i.store[RESOURCE_ENERGY] > 0});
                        
                        if(creep.store.getFreeCapacity() > 0) {
                            //get Energy out from container    
                            if(creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                            }
                        }
                
                } else {
                    let mines = creep.room.find(FIND_SOURCES)
                    if(creep.harvest(mines[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(mines[0]);
                    }
                }
            
            
                
            
    
	    }
    }
    }
};