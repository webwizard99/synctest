import TaskController from "./taskController";

const Battle = (function(){
    const textBox = document.querySelector('.battle-text');
    let textCount = 0;

    Battle.combatRound = function(adventurer, monster) {
        const { battleControllerId } = payload;
        const roundTaskID = TaskController.addTask(battleControllerID);
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

        const DOMReference = TaskController.getDOMReference();
        const roundTaskDOMID = `#${DOMReference.taskControllerTemplate}${battleControllerId}
        ${DOMReference.task}${roundTaskID}`;
        const roundTask = document.querySelector(roundTaskDOMID);
        roundTask.remove();
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
            textBox.scrollTop = Battle.textBox.scrollHeight - Battle.textBox.clientHeight;
        },
        // Add text to info box in battle mode
        addEmphasisText: function(textToAdd) {
            textBox.innerHTML +=  '<p class="emphasized">' + textToAdd + '</p>';
            textCount++;
        
            // if (Battle.textCount > 30) {
            //   Battle.textBox.removeChild(Battle.textBox.childNodes[0]);
            // }
            textBox.scrollTop = Battle.textBox.scrollHeight - Battle.textBox.clientHeight;
        },
        performBattle: function(adventurer, monster, payload) {
            const { battleControllerId } = payload;
            const battleTaskID = TaskController.addTask(battleControllerID);
            while (adventurer.alive && monster.alive) {
                combatRound(adventurer, monster, { battleControllerId: battleControllerId });
            }

            const DOMReference = TaskController.getDOMReference();
            const battleTaskDOMID = `#${DOMReference.taskControllerTemplate}${battleControllerId}
            ${DOMReference.task}${battleTaskID}`;
            const battleTask = document.querySelector(battleTaskDOMID);
            battleTask.remove();
            return;
        }
    }
}());


export default Battle;