//TESTING
var roleBuilder = require('role.builder');
var roleWallRepairer = {

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
	        
            //find all Ramparts in this room
            // var ramparts = creep.room.find(FIND_STRUCTURES, {
            //     filter: (structure) => structure.structureType == STRUCTURE_RAMPART
            // });

            let ramparts = creep.room.find(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_RAMPART
            }); 
            let target = undefined;

            for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001) {
                for(let rampart of ramparts) {
                    if(rampart.hits / rampart.hitsMax < percentage) {
                        target = rampart;
                        break;
                    }
                }

                if(target !=undefined) {
                    break;
                }
            }


            if(target != undefined){
            if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: { stroke: '#f4925d'}});
                
            } 
            } 
            // if Ramparts ok then beginn with check walls
            else if (!ramparts.length) {
                //find all Walls in this room
                let walls = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => structure.structureType == STRUCTURE_WALL
                });
                

                //sort the wall in HP
                for (let percentage = 0.000001; percentage <= 1; percentage = percentage + 0.000001) {
                    for(let wall of walls) {
                        if(wall.hits / wall.hitsMax < percentage) {
                            target = wall;
                            break;
                        }
                    }

                    if(target !=undefined) {
                        break;
                    }
                }
            }

            if(target != undefined) {
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: { stroke: '#f4925d'}});
                    
                } 
            }

            else {
                //if dont excist damaged buldings then do building .... or upgradin the controller
                roleBuilder.run(creep, room, HQ, room2);
            }
        
            

	    } else {

            //if the creep empty, search full containers
            const sources = creep.room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_STORAGE &&
                i.store[RESOURCE_ENERGY] > 0});
            
            //if creep empty, get Energy from Storage
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

module.exports = roleWallRepairer;
