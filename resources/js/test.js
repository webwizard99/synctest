import Battle from './battle.js';
import TaskController from './taskController.js';

const Adventurer = function(payload) {
    const { name,
    hp,
    attack,
    defense} = payload;
    this.name = name;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.alive = true;
}

Adventurer.prototype.takeDamage = function(payload) {
    const { val, attacker } = payload;
    if (val <= 0) {
        Battle.addText(`${attacker} missed ${this.name}`);
    } else {
        this.hp -= val;
        Battle.addText(`${this.name} took ${val} damage from ${attacker}.`)
    }
    if (this.hp <= 0) {
        this.hp = 0;
        this.alive = false;
        Battle.addEmphasisText(`${this.name} was killed by ${attacker}.`)
    }
}

let Adventurer1 = new Adventurer({ 
    name: "Marcus",
    hp: 42,
    attack: 6,
    defense: 4 });
let Adventurer2 = new Adventurer({ 
    name: "Zembold",
    hp: 38,
    attack: 4,
    defense: 6 });
let Adventurer3 = new Adventurer({ 
    name: "Sharvus",
    hp: 46,
    attack: 8,
    defense: 2 });

const adventurers = [Adventurer1, Adventurer2, Adventurer3];

const Monster = function(payload) {
    const {
        name,
        hp,
        attack,
        defense
    } = payload;
    this.name = name;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.alive = true;
}

Monster.prototype.takeDamage = function(payload) {
    const { val, attacker} = payload;
    
    if (val <= 0) {
        Battle.addText(`${attacker} missed ${this.name}`);
    } else {
        this.hp -= val;
        Battle.addText(`${this.name} took ${val} damage from ${attacker}.`)
    }
    
    if (this.hp <= 0) {
        this.hp = 0;
        this.alive = false;
        Battle.addEmphasisText(`${this.name} was killed by ${attacker}.`)
    }
}

const monster1 = {
    name: "Slime",
    hp: 8,
    attack: 3,
    defense: 2
};
const monster2 = {
    name: "Kobold",
    hp: 10,
    attack: 4,
    defense: 3
};
const monster3 = {
    name: "Ogre",
    hp: 14,
    attack: 6,
    defense: 4
};
const monster4 = {
    name: "Orc",
    hp: 12,
    attack: 5,
    defense: 3
};

const monsters = [monster1, monster2, monster3, monster4];

async function doBattles() {
    const battleControllerID = TaskController.createController();
    const battleTaskID = TaskController.addTask(battleControllerID);
    const fightRounds = 8;

    for (let combatant = 0; combatant < adventurers.length; combatant++) {
        for (let fight = 0; fight < fightRounds; fight++) {
            let adventurer = adventurers[combatant];
            const monster = new Monster(monsters[Math.round(Math.random() * (monsters.length - 1))]);

            if (adventurer.alive) {
                Battle.performBattle(adventurer, monster, {battleControllerId: battleControllerID });
            }
        }
    }
    TaskController.deleteTask({controllerId: battleControllerID, taskId: battleTaskID});
}

doBattles()

