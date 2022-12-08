//TESTING
var roleUpgrader = require('role.upgrader');

module.exports = {

    /** @param {Creep} creep **/
    run: function(creep, room, HQ, room2) {
        
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

            //if the creep empty, search full containers
            const sources = creep.room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_STORAGE &&
                i.store[RESOURCE_ENERGY] > 0});
            
            //if creep empty, get Energy from Container
            if(sources.length){
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