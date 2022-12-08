//TESTING
module.exports = {
    // a function to run the logic for this role
    run: function(creep, room, HQ, room2) {
        

    
        // if creep is supposed to transfer energy to a structure
        if (creep.store.getFreeCapacity() > 0) {
            // if in home room
            if (creep.room.name == creep.memory.home) {
                // find closest spawn, extension or tower which is not full
            
                //if the creep empty, search full containers
                const storage = creep.room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_STORAGE &&
                i.store[RESOURCE_ENERGY] > 0});
                
                
                    //get Energy out from container    
                    if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                
            }
            // if not in home room...
            else if(creep.room.name == !creep.memory.home)  {
                // find exit to home room
                let exit = creep.room.findExitTo(creep.memory.home);
                // and move to exit
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            // if in target room
            if (creep.room.name == creep.memory.target) {

                if(creep.store.getFreeCapacity() > 0) {

                    // find source
                    let source = creep.room.find(FIND_SOURCES)[creep.memory.sourceIndex];
                    // try to harvest energy, if the source is not in range
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        // move towards the source
                        creep.moveTo(source);
                    }
                
                } // if not in target room
                else {
                    // find exit to target room
                    let exit = creep.room.findExitTo(creep.memory.target);
                    // move to exit
                    creep.moveTo(creep.pos.findClosestByRange(exit));
                }
            }

        }
    }
}