var Battle = {}

Battle.textBox = document.querySelector('.battle-text');
Battle.textCount = 0;

// Add text to info box in battle mode
Battle.addText = function(textToAdd) {
    Battle.textBox.innerHTML +=  textToAdd;
    Battle.textCount++;
  
    // if (Battle.textCount > 30) {
    //   Battle.textBox.removeChild(Battle.textBox.childNodes[0]);
    // }
    Battle.textBox.scrollTop = Battle.textBox.scrollHeight - Battle.textBox.clientHeight;
  
}

Battle.performBattle = function(adventurer, monster) {
    while (adventurer.alive && monster.alive) {
        this.combatRound(adventurer, monster);
    }
    return;
}

Battle.combatRound = function(adventurer, monster) {
    const actors = [];
    if (Math.random() > .4) {
        actors.push(adventurer);
        actors.push(monster);
    } else {
        actors.push(monster);
        actors.push(adventurer);
    }

    const damage1 = Math.round(actors[0].attack * Math.random()) - 
        Math.round(actors[1].defense * Math.random());
    
    actors[1].takeDamage({val: damage1, attacker: actors[0].name});
    

    const damage2 = Math.round(actors[1].attack * Math.random()) -
        Math.round(actors[0].defense * Math.random());
    
    actors[0].takeDamage({val: damage2, attacker: actors[1].name});
    return;
}
export default Battle;