import adventurers from '../../../vendor/src/game_modules/adventurers';
import Battle from './battle';

// const Phase = function(payload) {
//     const {currentFunction, nextFunction} = payload;
//     this.currentFunction = currentFunction;
//     this.nextFunction = nextFunction;
// }

class AsyncLock {
    constructor () {
      this.disable = () => {}
      this.promise = Promise.resolve()
    }
  
    enable () {
      this.promise = new Promise(resolve => this.disable = resolve)
    }
  }
  
//   /*
//     EXAMPLE USAGE:
//   */
  
//   // Create a new lock
//   const lock = new AsyncLock()
  
//   // Enable it
//   lock.enable()
  
//   // Make an async function that...
//   async function test () {
//     // Waits for the lock to be disabled
//     await lock.promise
  
//     // Then writes to STDOUT
//     console.log('Test')
//   }

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
        Battle.addText(`${this.name} has died.`)
    }
}

let Adventurer1 = new Adventurer({ 
    name: "Marcus",
    hp: 22,
    attack: 6,
    defense: 4 });
let Adventurer2 = new Adventurer({ 
    name: "Zembold",
    hp: 18,
    attack: 4,
    defense: 6 });
let Adventurer3 = new Adventurer({ 
    name: "Sharvus",
    hp: 26,
    attack: 8,
    defense: 2 });

const Adventurers = [Adventurer1, Adventurer2, Adventurer3];

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
        Battle.addText(`${this.name} has died.`)
    }
}

const monster1 = new Monster({
    name: "Slime",
    hp: 8,
    attack: 3,
    defense: 2
});
const monster2 = new Monster({
    name: "Kobold",
    hp: 10,
    attack: 4,
    defense: 3
});
const monster3 = new Monster({
    name: "Ogre",
    hp: 14,
    attack: 6,
    defense: 4
});
const monster4 = new Monster({
    name: "Orc",
    hp: 12,
    attack: 5,
    defense: 3
});
const monsters = [monster1, monster2, monster3, monster4];

const lock = new AsyncLock();

async function doBattles() {
    await lock.promise;
    lock.enable();

    adventurers.foreach(adventurer => {
        for (let fight = 0; fight < 3; fight++) {
            const monster = Object.assign(monster[Math.round(Math.random() * monsters.length)]);
            Battle.performBattle(adventurer, monster);
        }
    });

    lock.disable();

}

doBattles()

