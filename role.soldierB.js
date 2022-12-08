//TESTING
var aSpot = undefined;
module.exports = {
    // a function to run the logic for this role
    run: function(creep, room, HQ, room2) {
        
        //creep.moveTo(Game.flags.hSpot);
        if(Game.rooms.name != Game.flags.bSpot.room) {
        creep.moveTo(Game.flags.bSpot);
        }
        //if the Spot flag is in this room, beginn searching for enemys
        
            if(Game.rooms.name != Game.flags.bSpot.room) {
                    let enemycreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                    let enemyStructure = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES,
                        {filter: (structure) => structure.structureType != STRUCTURE_CONTROLLER});
                    if(enemycreep) {
                        // try to harvest energy, if the source is not in range
                        if (creep.attack(enemycreep) == ERR_NOT_IN_RANGE) {
                            // move towards the source
                            creep.moveTo(enemycreep), {visualizePathStyle: {stroke: '#cc0000'}}; 
                        }
                    } 
                    else if(enemyStructure) 
                    {
                        // try to harvest energy, if the source is not in range
                        if (creep.attack(enemyStructure) == ERR_NOT_IN_RANGE) {
                            // move towards the source
                            creep.moveTo(enemyStructure), {visualizePathStyle: {stroke: '#cc0000'}}; 
                        }
                    }
                    
            } else {
                creep.moveTo(Game.flags.bSpot);
            }
      
    }
}