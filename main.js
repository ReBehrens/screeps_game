//TESTING
// Imports

let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleHauler = require('role.hauler');
let roleHauler2 = require('role.hauler2');
let roleBuilder = require('role.builder');
let roleRepairer = require('role.repairer');
let roleLongDistanceHarvester = require('role.longdistanceharvester');
let roleWallRepairer = require('role.wallrepairer');
let roleSoldierA = require('role.soldierA');
let roleSoldierB = require('role.soldierB');
let roomDefense = require('room.defense');
let roleBuilder2 = require('role.builder2');
//var roleHarvesteNew = require('role.harvesternew');

const HQ = 'W9N4';
const room2 = 'W9N3';
const sindex = 0;


//----------------------Minimum creeps in the Roles--------------------------------
const minHarvestersHQ = 1;  // Harvester                  1
const minHaulersHQ = 1;    // Hauler for spawning      1
const minHaulers2HQ = 1;      // hauler 2               1
const minBuildersHQ = 1;        // Builder              2
const minRepairersHQ = 1;          // Repairer           2
const minUpgradersHQ = 1;            // Upgrader         2
const minSoldiersAHQ = 0;    // TEST SOLDIER             0
const minSoldiersBHQ = 0;    // TEST SOLDIER             0
const minLDHarvestersHQ = 0;             // LDHarvester NOT WORKING
const minWallRepairersHQ = 1;              // Wall Repairers

const minBuilders2HQ = 0;        // Builder

const towerRepair = true;    // if the Tower Repair other Builds false=Repair OFF ; true = Repair on 
//----------------------------------------------------------------------------------


//----------------------Minimum creeps in the Roles--------------------------------
const minHarvesters = 1;  // Harvester                  1
const minHaulers = 1;    // Hauler for spawning      1
const minHaulers2 = 1;      // hauler 2               1
const minBuilders = 1;        // Builder              2
const minRepairers = 1;          // Repairer           2
const minUpgraders = 1;            // Upgrader         2
const minSoldiersA = 0;    // TEST SOLDIER             0
const minSoldiersB = 0;    // TEST SOLDIER             0
const minLDHarvesters = 0;             // LDHarvester NOT WORKING
const minWallRepairers = 1;              // Wall Repairers

const minBuilders2 = 0;        // Builder

module.exports.loop = function () {
    //------------------------------Cleaning Alg.----------------------------------------------------------
    // Loop through each creep's name in Memory.creeps
    for (let creepName in Memory.creeps) {

        // If the creep's name isn't in Game.creeps
        if (!Game.creeps[creepName]) {

            // Remove death creeps from memory
            delete Memory.creeps[creepName];
            console.log('Clearing non-existing creep from the memory:', creepName);
        }
    }

    // Room by Room
    _.forEach(Game.rooms, function (room) {
        //var roomname = room;
        let spawnname = Game.spawns.name;
        let roomName = room.name;

        //console.log(spawnname);
        //console.log(roomName);

        //_______________________________________Autospawn_Beginns______________________________________________
        // Get counts for creeps of each role
        
        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.home == roomName);
        let harvestersNew = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesternew' && creep.memory.home == roomName);
        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.home == roomName);
        let haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler' && creep.memory.home == roomName);
        let haulers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler2' && creep.memory.home == roomName);
        let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer' && creep.memory.home == roomName);
        let wallrepairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'wallrepairer' && creep.memory.home == roomName);
        let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.home == roomName);
        let soldieresA = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldierA' && creep.memory.home == roomName);
        let soldieresB = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldierB' && creep.memory.home == roomName);
        let longDistanceHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'ldharvester' && creep.memory.home == roomName);

        let builders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder2' && creep.memory.home == roomName);

        
        //console.log(test.length + ' ' + roomName);


        // console.log('Harvester    ' + harvesters.length + ' ' + roomName);
        // console.log('HarvesterNEW ' + harvestersNew.length + ' ' + roomName);
        // console.log('upgraders    ' + upgraders.length + ' ' + roomName);
        // console.log('Hauler       ' + haulers.length + ' ' + roomName);
        // console.log('Hauler2      ' + haulers2.length + ' ' + roomName);
        // console.log('rep          ' + repairers.length + ' ' + roomName);
        // console.log('WALLrep.     ' + wallrepairers.length + ' ' + roomName);
        // console.log('Builder      ' + builders.length + ' ' + roomName);
        // console.log('soldiresB    ' + soldieresB.length + ' ' + roomName);
        // console.log('builder2     ' + builders2.length + ' ' + roomName);
        // console.log('--------------------------------');



        if(roomName == HQ) {
            if (harvesters.length < minHarvestersHQ) { // not enough harvester 
                // Spawn a new one
                let newName = 'Harvester' + Game.time;
                if (Game.spawns['Spawn1'].spawnCreep([MOVE, WORK, WORK, WORK, WORK, WORK, WORK], newName, { memory: { role: 'harvester', home: roomName } }) == ERR_NOT_ENOUGH_ENERGY && harvestersNew.length == 0) {
                    Game.spawns['Spawn1'].spawnCreep([WORK, WORK, MOVE], newName, { memory: { role: 'harvester', home: roomName } });
                }    //MOVE, WORK, WORK, WORK, WORK, WORK, WORK,
            
            } else if (haulers.length < minHaulersHQ) { // not enugh haulers 
                // Spawn a new one
                let newName = 'Hauler' + Game.time;     
                if (Game.spawns['Spawn1'].spawnCreep([CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, MOVE], newName, { memory: { role: 'hauler', home: roomName, working: false} }) == ERR_NOT_ENOUGH_ENERGY && haulers.length == 0) {
                    Game.spawns['Spawn1'].spawnCreep([CARRY, MOVE], newName, { memory: { role: 'hauler', home: roomName, working: false} });
                }   //CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, CARRY, MOVE        
            } else if (haulers2.length < minHaulers2HQ) { // not enugh haulers
                // Spawn a new one
                let newName = 'Hauler2.' + Game.time;
                Game.spawns['Spawn1'].spawnCreep([CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], newName, { memory: { role: 'hauler2', home: roomName, working: false } });
            }   //CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, CARRY, MOVE   
            else if (builders.length < minBuildersHQ) { // not enough builders
                // Spawn a new one
                let newName = 'builder' + Game.time;        
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, MOVE, CARRY, WORK, CARRY, CARRY, MOVE], newName, { memory: { role: 'builder', home: roomName, working: false } });
                //WORK, MOVE, CARRY, WORK, CARRY, CARRY, MOVE   
            
            } else if (repairers.length < minRepairersHQ) { // not enough repairer
                // Spawn a new one
                let newName = 'Repairer' + Game.time;       
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE], newName, { memory: { role: 'repairer', home: roomName, working: false } });
                //WORK,CARRY,CARRY, CARRY, MOVE 
            
            } else if (upgraders.length < minUpgradersHQ) { // not enough updater
                // Spawn a new one
                let newName = 'Upgrader' + Game.time;       
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'upgrader', upgrading: false, home: roomName, working: false } });
                //WORK, CARRY, MOVE 
            
            } else if (soldieresA.length < minSoldiersAHQ) { // not enough Soldieres Class A
                // Spawn a new one
                let newName = 'SoldierCA' + Game.time;      
                Game.spawns['Spawn1'].spawnCreep([TOUGH, TOUGH, TOUGH, ATTACK, CLAIM, MOVE, MOVE], newName, { memory: { role: 'soldierA', home: roomName } });
                //WORK, CARRY, MOVE 
            
            } else if (soldieresB.length < minSoldiersBHQ) { // not enough Soldieres Class A
                // Spawn a new one
                let newName = 'SoldierCB' + Game.time;      
                Game.spawns['Spawn1'].spawnCreep([TOUGH, TOUGH, ATTACK, ATTACK, RANGED_ATTACK, MOVE, MOVE], newName, { memory: { role: 'soldierB', home: roomName } });
                //WORK, CARRY, MOVE     
            } else if (longDistanceHarvesters.length < minLDHarvestersHQ) { // not enough long distance harvester
                // Spawn a new one
                let newName = 'LDHaervester' + Game.time;       
                Game.spawns['Spawn1'].spawnCreep([WORK, MOVE, CARRY, WORK, CARRY, CARRY, MOVE], newName, { memory: { role: 'ldharvester', working: false, home: roomName, target: rtarget, sourceIndex: sindex } });
                //WORK, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE    
            
            } else if (wallrepairers.length < minWallRepairersHQ) { // not enough wallrepairers
                // Spawn a new one
                let newName = 'Wall-Repairer' + Game.time;      
                Game.spawns['Spawn1'].spawnCreep([MOVE, CARRY, WORK, CARRY, MOVE], newName, { memory: { role: 'wallrepairer', home: roomName, working: false } });
                //WORK, CARRY, MOVE     
            } else if (builders2.length < minBuilders2HQ) { // not enough builders"
                // Spawn a new one
                let newName = 'Builder2.' + Game.time;
                Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'builder2', home: roomName, working: false } });
                //WORK, CARRY, MOVE
            }
        }
        // If the spawn is spawning a creep
        if (Game.spawns['Spawn1'].spawning) {

            // Get the creep being spawned
            let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name]

            // Visualize the role of the spawning creep above the spawn
            Game.spawns['Spawn1'].room.visual.text('🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y, { align: 'left', opacity: 0.8 });
        }
        
        //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        if(roomName == room2) {
            if (harvesters.length < minHarvesters) { // not enough harvester 
                // Spawn a new one
                let newName = 'Harvester' + Game.time;
                if (Game.spawns['Spawn2'].spawnCreep([MOVE, WORK, WORK,MOVE, WORK, WORK, WORK], newName, { memory: { role: 'harvester', home: roomName } }) == ERR_NOT_ENOUGH_ENERGY && harvestersNew.length == 0) {
                    Game.spawns['Spawn2'].spawnCreep([WORK, WORK, MOVE], newName, { memory: { role: 'harvester', home: roomName } });
                }    //MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE

            } else if (haulers.length < minHaulers) { // not enugh haulers 
                // Spawn a new one
                let newName = 'Hauler' + Game.time;

                if (Game.spawns['Spawn2'].spawnCreep([CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, MOVE], newName, { memory: { role: 'hauler', home: roomName, working: false} }) == ERR_NOT_ENOUGH_ENERGY && haulers.length == 0) {
                    Game.spawns['Spawn2'].spawnCreep([CARRY, MOVE], newName, { memory: { role: 'hauler', home: roomName, working: false } });
                }    //CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, CARRY, MOVE


            } else if (haulers2.length < minHaulers2) { // not enugh haulers 
                // Spawn a new one

                let newName = 'Hauler2.' + Game.time;

                Game.spawns['Spawn2'].spawnCreep([CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, MOVE], newName, { memory: { role: 'hauler2', home: roomName, working: false} });
                //CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, CARRY, MOVE

            } else if (builders.length < minBuilders) { // not enough builders 
                // Spawn a new one
                let newName = 'builder' + Game.time;

                Game.spawns['Spawn2'].spawnCreep([WORK, WORK, MOVE, CARRY, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'builder', home: roomName, working: false } });
                //WORK, MOVE, CARRY, WORK, CARRY, CARRY, MOVE

            } else if (repairers.length < minRepairers) { // not enough repairer
                // Spawn a new one
                let newName = 'Repairer' + Game.time;

                Game.spawns['Spawn2'].spawnCreep([MOVE, CARRY,WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'repairer', home: roomName, working: false } });
                //WORK,CARRY,CARRY, CARRY, MOVE

            } else if (upgraders.length < minUpgraders) { // not enough updater 
                // Spawn a new one
                let newName = 'Upgrader' + Game.time;

                Game.spawns['Spawn2'].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'upgrader', upgrading: false, home: roomName, working: false } });
                //WORK, CARRY, MOVE

            } else if (soldieresA.length < minSoldiersA) { // not enough Soldieres Class A
                // Spawn a new one
                let newName = 'SoldierCA' + Game.time;

                Game.spawns['Spawn2'].spawnCreep([TOUGH, TOUGH, TOUGH, ATTACK, CLAIM, MOVE, MOVE], newName, { memory: { role: 'soldierA', home: roomName } });
                //WORK, CARRY, MOVE

            } else if (soldieresB.length < minSoldiersB) { // not enough Soldieres Class A
                // Spawn a new one
                let newName = 'SoldierCB' + Game.time;

                Game.spawns['Spawn2'].spawnCreep([TOUGH, TOUGH, ATTACK, ATTACK, RANGED_ATTACK, MOVE, MOVE], newName, { memory: { role: 'soldierB', home: roomName } });
                //WORK, CARRY, MOVE

            } else if (longDistanceHarvesters.length < minLDHarvesters) { // not enough long distance harvester 
                // Spawn a new one
                let newName = 'LDHaervester' + Game.time;

                Game.spawns['Spawn2'].spawnCreep([WORK, MOVE, CARRY, WORK, CARRY, CARRY, MOVE], newName, { memory: { role: 'ldharvester', working: false, home: roomName, target: rtarget, sourceIndex: sindex } });
                //WORK, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE

            } else if (wallrepairers.length < minWallRepairers) { // not enough wallrepairers
                // Spawn a new one
                let newName = 'Wall-Repairer' + Game.time;

                Game.spawns['Spawn2'].spawnCreep([MOVE, CARRY, WORK, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'wallrepairer', home: roomName, working: false } });
                //WORK, CARRY, MOVE

            } else if (builders2.length < minBuilders2) { // not enough builders"
                // Spawn a new one
                let newName = 'Builder2.' + Game.time;
                Game.spawns['Spawn2'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, { memory: { role: 'builder2', home: roomName, working: false } });
                //WORK, CARRY, MOVE
            }
        }
        // If the spawn is spawning a creep
        if (Game.spawns['Spawn2'].spawning) {

            // Get the creep being spawned
            let spawningCreep = Game.creeps[Game.spawns['Spawn2'].spawning.name]

            // Visualize the role of the spawning creep above the spawn
            Game.spawns['Spawn2'].room.visual.text('🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn2'].pos.x + 1,
                Game.spawns['Spawn2'].pos.y, { align: 'left', opacity: 0.8 });
        }








            //______________________________________________DEFENCE_BEGINN____________________________________________________

            roomDefense(room, towerRepair);

            //_______________________________CREEP__LOOP______________________________
            // Loop through creep's names in Game.creeps
            for (let creepName in Game.creeps) {

                // Get the creep based on the its name
                let creep = Game.creeps[creepName]

                // If the creep is a harvester
                if (creep.memory.role == 'harvester') {

                    // Run the creep as one
                    roleHarvester.run(creep);
                    continue
                }

                // If the creep is an upgrader
                if (creep.memory.role == 'upgrader') {

                    roleUpgrader.run(creep, room, HQ, room2);
                    continue
                }

                // If the creep is a hauler
                if (creep.memory.role == 'hauler') {

                    roleHauler.run(creep, room, HQ, room2);
                    continue
                }
                // If the creep is a hauler
                if (creep.memory.role == 'hauler2') {

                    roleHauler2.run(creep, room, HQ, room2);
                    continue
                }

                // If the creep is a repairer
                if (creep.memory.role == 'repairer') {

                    roleRepairer.run(creep, room, HQ, room2);
                    continue
                }

                // If the creep is a builder
                if (creep.memory.role == 'builder') {

                    roleBuilder.run(creep, room, HQ, room2);
                    continue
                }

                // If the creep is a wallrepairer
                if (creep.memory.role == 'wallrepairer') {

                    roleWallRepairer.run(creep, room, HQ, room2);
                    continue
                }

                // If the creep is a LongDistanceHarvester
                if (creep.memory.role == 'ldharvester') {

                    roleLongDistanceHarvester.run();
                    continue
                }

                // If the creep is a Soldieres Class A
                if (creep.memory.role == 'soldierA') {

                    roleSoldierA.run(creep, room, HQ, room2);
                    continue
                }

                if (creep.memory.role == 'soldierB') {

                    roleSoldierB.run(creep, room, HQ, room2);
                    continue
                }


                if (creep.memory.role == 'builder2') {

                    roleBuilder2.run(creep, room, HQ, room2);
                    continue
                }
                //------------------
                // if (creep.memory.role == 'harvesternew') {

                //     roleHarvesteNew.run(creep);
                //     continue
                // }

            }
    }
);
}