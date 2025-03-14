import "./styles.css";

// SVGs

import circleoutline from "./assets/svgs/circle-outline.svg";
import trashcan from "./assets/svgs/trash-can.svg";

function TodoController() {
    const Screen = ScreenController();

    class Task {
        constructor(title, time, priority) {
            this.title = title;
            this.time = time;
            this.priority = priority;
            this.checked = false;
        };

        check(checked) {
            if (checked === false) {
                checked = true;
                // logic to change task on screen
            } else {
                checked = false;
                // logic to change task on screen
            };
        };

        get Title() {
            return this.title;
        };

        get Time() {
            return this.time;
        };

        get Priority() {
            return this.priority;
        };
    };

    function createProject() {

    };

    function createTask(title, time, priority) {
        if (localStorage.getItem(title)) {
            return "DUPLICATE";
        };

        let newTask = new Task(title, time, priority);
        localStorage.setItem(String(title), JSON.stringify(newTask));
        Screen.addTaskToScreen(newTask);
        return newTask;
    };

    return { createProject, createTask };
};

function ScreenController() {
    let activePage = "today";

    function addButtonEventListeners() {

    };

    function openPage() {

    };

    function removeContents() {
        let content = document.querySelector(".project-wrapper");
        content.remove();
    };

    function addTaskToScreen(taskObject) {
        let taskDiv = document.createElement("div");
        taskDiv.classList.toggle("task");

        let leftDiv = document.createElement("div");
        leftDiv.classList.toggle("left");

        // Adding toggle button and image
        let toggleButton = document.createElement("button");
        let toggleButtonImg = document.createElement("img");
        toggleButton.classList.toggle("toggle");
        toggleButtonImg.src = circleoutline;
        toggleButton.appendChild(toggleButtonImg);
        leftDiv.appendChild(toggleButton);

        // Div containing task information
        let infoDiv = document.createElement("div");
        infoDiv.classList.toggle("task-info");
        let titleText = document.createElement("p");
        titleText.textContent = taskObject.Title; 
        let timeText = document.createElement("p");
        timeText.classList.toggle("time");
        timeText.textContent = taskObject.Time;
        infoDiv.appendChild(titleText);
        infoDiv.appendChild(timeText);

        // Append leftdiv to main div
        leftDiv.appendChild(infoDiv);
        taskDiv.appendChild(leftDiv);

        // Adding task option buttons
        let taskOptionsDiv = document.createElement("div");
        taskOptionsDiv.classList.toggle("task-options");

        let trashButton = document.createElement("button");
        trashButton.classList.toggle("delete");
        
        let trashButtonImg = document.createElement("img");
        trashButtonImg.src = trashcan;

        trashButton.appendChild(trashButtonImg);
        taskOptionsDiv.appendChild(trashButton);
        taskDiv.appendChild(taskOptionsDiv);

        // Finally, add the task div to the webpage
        const projects = document.querySelector(".my-projects");
        projects.appendChild(taskDiv);

    }

    return { removeContents, addTaskToScreen };
};

const newtask = TodoController().createTask("bun you fam", "1135", "high")