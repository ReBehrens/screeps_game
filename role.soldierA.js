//TESTING
var aSpot = undefined;
module.exports = {
    // a function to run the logic for this role
    run: function(creep, room, HQ, room2) {
        
        //creep.moveTo(Game.flags.hSpot);
        
        creep.moveTo(Game.flags.aSpot);
        //if the Spot flag is in this room, beginn searching for enemys
        
            if(Game.rooms.name != Game.flags.aSpot.room) {
                    let enemycreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
                    
                    

                    if(enemycreep) {
                        // try to harvest energy, if the source is not in range
                        if (creep.attack(enemycreep) == ERR_NOT_IN_RANGE) {
                            // move towards the source
                            creep.moveTo(enemycreep), {visualizePathStyle: {stroke: '#cc0000'}}; 
                        }
                    } 
                    // else if(enemyStructure) 
                    // {
                    //    if(creep.room.controller) {
                    // if(creep.signController(creep.room.controller, "i think thats will be mine :D ") == ERR_NOT_IN_RANGE) {
                    //     creep.moveTo(creep.room.controller);
                    //}
                    else if(creep.room.controller && !creep.room.controller.my) {
                        if(creep.attackController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller);
                        }
                        if(creep.room.controller) {
                            if(creep.claimController(creep.room.controller, "i think thats will be mine :D ") == ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.controller);
                            }
                        }
                    
                    
                //console.log('beginn attack');
            } else {
                creep.moveTo(Game.flags.aSpot);
                // if(creep.room.controller) {
                //     if(creep.signController(creep.room.controller, " - ") == ERR_NOT_IN_RANGE) {
                //         creep.moveTo(creep.room.controller);
                //     }
                // }
                //console.log('going to spot');
            }
        



            // // if in target room
            // if (creep.room.name == creep.memory.target) {

            //     // find source
            //     let enemycreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
            //     let enemycontroller = creep.pos.findClosestByRange(FIND_HOSTILE_SPAWNS)
            //     if(enemycreep) {
            //         // try to harvest energy, if the source is not in range
            //         if (creep.attack(enemycreep) == ERR_NOT_IN_RANGE) {
            //             // move towards the source
            //             creep.moveTo(enemycreep), {visualizePathStyle: {stroke: '#cc0000'}}; 
            //         }
            //     } else if(enemycontroller) {
            //         // try to harvest energy, if the source is not in range
            //         if (creep.attack(enemycontroller) == ERR_NOT_IN_RANGE) {
            //             // move towards the source
            //             creep.moveTo(enemycontroller), {visualizePathStyle: {stroke: '#cc0000'}}; 
            //         }

            //     }
            // } // if not in target room
            // else {
            //     // find exit to target room
            //     let exit = creep.room.findExitTo(creep.memory.target);
            //     // move to exit
            //     creep.moveTo(creep.pos.findClosestByRange(exit));
            // }

      
    }
}
}