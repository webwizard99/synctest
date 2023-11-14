import AsyncLock from "./AsycLock";

const TaskController = (function() {

    const taskControllers = [];

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
        const observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(newDiv, mutationConfig);
        this.lock = new AsyncLock();
        await lock.promise;
        lock.enable();
    }

    TaskControllerLocal.prototype.checkTasks = function() {
        const controllerDiv = document.querySelector(`#${DOMReference.taskControllerTemplate}${this.controllerId}`);
        const children = controllerDiv.childElementCount;
        if (children === 0) {
            this.delete();
        }
    }

    TaskControllerLocal.prototype.addTask = function() {
        const localContainer = document.querySelector(`#${DOMReference.taskControllerTemplate}${this.controllerId}`);
        const taskID = this.taskIndex;
        const newDiv = document.createElement("div");
        newDiv.setAttribute("id", 
            `${DOMReference.taskControllerTemplate}${this.controllerId}
            ${DOMReference.task}${taskID}`);
        localContainer.appendChild(newDiv);
        this.taskIndex++;
        return taskID;
    }

    TaskControllerLocal.prototype.delete = async function() {
        const taskDiv = document.querySelector(`#${DOMReference.taskControllerTemplate}${this.controllerId}`);
        taskMaster.removeChild(taskDiv);
        taskControllers = taskControllers.filter(controller => controller.controllerId !== this.controllerId);
        this.lock.disable();
        this = null;
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
        addTask: function(controllerID) {
            const targetController = taskControllers.find(controller => controller.controllerID === controllerID);
            if (targetController) {
                const returnID = targetController.addTask();
                return returnID;
            } else {
                console.log('Attempted to add task too controller with invalid controller id.');
            }
        },
        getDOMReference: function() {
            return DOMReference;
        }
    }
})();



export default TaskController;