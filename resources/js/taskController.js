import AsyncLock from "./AsyncLock.js";

const TaskController = (function() {

    let taskControllers = [];

    const initialID = 1;
    let currentIndex = initialID;

    const DOMReference = {
        taskContainer: '#task-container',
        taskControllerTemplate: 'task-controller-',
        task: '-task-'
    }

    const mutationConfig = { attributes: true, childList: true, subtree: true };


    const taskMaster = document.querySelector(DOMReference.taskContainer);
    
    const TaskControllerLocal = function(payload) {
        const { controllerId } = payload;
        this.controllerId = controllerId;
        this.taskIndex = 1;
    }

    TaskControllerLocal.prototype.delete = async function() {
        const taskDiv = document.querySelector(`#${DOMReference.taskControllerTemplate}${this.controllerId}`);
        taskMaster.removeChild(taskDiv);
        taskControllers = taskControllers.filter(controller => controller.controllerId !== this.controllerId);
        this.lock.disable();
    }

    TaskControllerLocal.prototype.checkTasks = function() {
        const controllerDiv = document.querySelector(`#${DOMReference.taskControllerTemplate}${this.controllerId}`);
        if (controllerDiv) {
            const children = controllerDiv.childElementCount;
            if (children === 0) {
                this.delete();
            }
        }
        
    }

    TaskControllerLocal.prototype.init = async function() {
        const newDiv = document.createElement("div");
        newDiv.setAttribute("id", `${DOMReference.taskControllerTemplate}${this.controllerId}`)
        taskMaster.appendChild(newDiv);
        // Callback function to execute when mutations are observed
        const callback = function(mutationList, observer) {
            // Use traditional 'for loops' for IE 11
            for (const mutation of mutationList) {
                if (mutation.type === 'childList') {
                    this.checkTasks();
                }
            }
        };

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback.bind(this));

        // Start observing the target node for configured mutations
        observer.observe(newDiv, mutationConfig);
        this.lock = new AsyncLock();
        await this.lock.promise;
        this.lock.enable();
    }

    

    TaskControllerLocal.prototype.addTask = function() {
        const localContainer = document.querySelector(`#${DOMReference.taskControllerTemplate}${this.controllerId}`);
        const taskID = this.taskIndex;
        const newDiv = document.createElement("div");
        newDiv.setAttribute("id", 
            `${DOMReference.taskControllerTemplate}${this.controllerId}${DOMReference.task}${taskID}`);
        localContainer.appendChild(newDiv);
        this.taskIndex++;
        return taskID;
    }

    

    return {
        createController: function() {
            const newTaskController = new TaskControllerLocal({controllerId: currentIndex});
            taskControllers.push(newTaskController);
            currentIndex += 1;
            newTaskController.init();
            return newTaskController.controllerId;
        },
        getController: function(id) {
            const returnController = taskControllers.find(controller => controller.controllerId === id);
            if (returnController) {
                return returnController;
            } else {
                console.log('Failed attempt to GET controller');
            }
        },
        addTask: function(controllerId) {
            const targetController = taskControllers.find(controller => controller.controllerId === controllerId);
            if (targetController) {
                const returnID = targetController.addTask();
                return returnID;
            } else {
                console.log('Attempted to add task too controller with invalid controller id.');
                return false;
            }
        },
        getDOMReference: function() {
            return DOMReference;
        },
        deleteTask: function(payload) {
            const { controllerId, taskId } = payload;
            const taskDOMID = `#${DOMReference.taskControllerTemplate}${controllerId}${DOMReference.task}${taskId}`;
            const task = document.querySelector(taskDOMID);
            if (task) {
                task.remove();
            } else {
                console.log('Tried to remove task that could not be found.');
            }
            
        }
    }
})();



export default TaskController;