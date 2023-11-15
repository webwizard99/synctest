import TaskController from "./taskController.js";

const Battle = (function(){
    const textBox = document.querySelector('.battle-text');
    let textCount = 0;

    const combatRound = function(adventurer, monster, payload) {
        const { battleControllerId } = payload;
        const roundTaskID = TaskController.addTask(battleControllerId);
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
        
    
        if (actors[1].alive) {
            const damage2 = Math.round(actors[1].attack * Math.random()) -
                Math.round(actors[0].defense * Math.random());
            
            actors[0].takeDamage({val: damage2, attacker: actors[1].name});
        }

        TaskController.deleteTask({controllerId: battleControllerId, taskId: roundTaskID})
        
        return;
    }

    return {
        // Add text to info box in battle mode
        addText: function(textToAdd) {
            textBox.innerHTML +=  '<p>' + textToAdd + '</p>';
            textCount++;
        
            // if (Battle.textCount > 30) {
            //   Battle.textBox.removeChild(Battle.textBox.childNodes[0]);
            // }
            textBox.scrollTop = textBox.scrollHeight - textBox.clientHeight;
        },
        // Add text to info box in battle mode
        addEmphasisText: function(textToAdd) {
            textBox.innerHTML +=  '<p class="emphasized">' + textToAdd + '</p>';
            textCount++;
        
            // if (Battle.textCount > 30) {
            //   Battle.textBox.removeChild(Battle.textBox.childNodes[0]);
            // }
            textBox.scrollTop = textBox.scrollHeight - textBox.clientHeight;
        },
        performBattle: function(adventurer, monster, payload) {
            const { battleControllerId } = payload;
            const battleTaskID = TaskController.addTask(battleControllerId);
            while (adventurer.alive && monster.alive) {
                combatRound(adventurer, monster, { battleControllerId: battleControllerId });
            }
            TaskController.deleteTask({controllerId: battleControllerId, taskId: battleTaskID});
            return;
        }
    }
}());


export default Battle;