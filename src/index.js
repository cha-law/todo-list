import "./styles.css";

// SVGs

import circleoutline from "./assets/svgs/circle-outline.svg";
import trashcan from "./assets/svgs/trash-can.svg";
import rename from "./assets/svgs/rename.svg";
import plus from "./assets/svgs/plus2.svg";

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
    };

    function createProject(title) {
        let i = 0;
        // Ensuring we don't override existing elements.
        while (localStorage.getItem(i) != null) {
            i++;
        };
        localStorage.setItem(i, "[]");

        // Store the title of the project.
        let namesArray = JSON.parse(localStorage.getItem("names")); 
        if (namesArray === null) {
            localStorage.setItem("names", "[]");
            namesArray = JSON.parse(localStorage.getItem("names")); 
        };

        namesArray.splice(i, 0, title);
        localStorage.setItem("names", JSON.stringify(namesArray));

        // Add project to projects list in the sidebar

        //////
    };

    function createTask(title, time, priority, pageID) {
        if (localStorage.getItem(title)) { // NEEDS TO BE UPDATED: TASKS ARE NOW IN ARRAYS
            return "DUPLICATE";
        };

        let newTask = new Task(title, time, priority);

        // Add the item to the array in the page array in local storage.
        let pageArray = [];
        pageArray = JSON.parse(localStorage.getItem(pageID)) || [];
        pageArray.push(newTask);
        localStorage.setItem(pageID, JSON.stringify(pageArray));

        Screen.refreshPage();
    };

    function addToday() {
        if (localStorage.getItem(0) === null) {
            createProject("Today");
            createTask("Eat Breakfast", "7:30 AM", "high", 0);
        };
        Screen.refreshPage();
    };

    return { createProject, createTask, addToday };
};

function ScreenController() {
    let activePage = 0;

    function addButtonEventListeners() {
        const addTask = document.querySelector(".add-task");
        addTask.addEventListener("click", openAddTaskDialog);
    };

    function openAddTaskDialog() {
        
    };

    function refreshPage() {
        removeContents();
        openPage(activePage);
    };

    function openPage(pageID) {
        const content = document.createElement("div");
        content.classList.toggle("project-wrapper");

        let optionsDiv = document.createElement("div");
        optionsDiv.classList.toggle("project-options");

        // Add two buttons
        let renameButton = document.createElement("button");
        let renameImg = document.createElement("img");
        renameImg.src = rename;
        renameButton.appendChild(renameImg);

        let deleteButton = document.createElement("button");
        let deleteImg = document.createElement("img");
        deleteImg.src = trashcan;
        deleteButton.appendChild(deleteImg);

        optionsDiv.appendChild(renameButton);
        optionsDiv.appendChild(deleteButton);
        content.appendChild(optionsDiv);

        // Add heading
        let h1 = document.createElement("h1");
        h1.textContent = JSON.parse(localStorage.getItem("names"))[pageID];
        content.appendChild(h1);

        // Add tasks div
        let tasksDiv = document.createElement("div");
        tasksDiv.classList.toggle("content-page");
        content.appendChild(tasksDiv);

        let h3 = document.createElement("h3");
        h3.textContent = "My Tasks";
        tasksDiv.appendChild(h3);

        document.querySelector(".content").appendChild(content);

        // Add every task in local storage
        const currentPage = JSON.parse(localStorage.getItem(pageID));

        currentPage.forEach(task => {
            addTaskToScreen(task);
        });

        // Add the Add Task button
        let addTaskButton = document.createElement("div");
        addTaskButton.classList.toggle("task");
        addTaskButton.classList.toggle("add-task");

        let plusImg = document.createElement("img");
        plusImg.src = plus;

        let addTaskText = document.createElement("p");
        addTaskText.textContent = "Add Task";

        addTaskButton.appendChild(plusImg);
        addTaskButton.appendChild(addTaskText);

        tasksDiv.appendChild(addTaskButton);

        activePage = pageID;
    };

    function removeContents() {
        const content = document.querySelector(".project-wrapper");
        if (content) {
            content.remove();
        };
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
        titleText.textContent = taskObject.title; 
        let timeText = document.createElement("p");
        timeText.classList.toggle("time");
        timeText.textContent = taskObject.time;
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
        const content = document.querySelector(".content-page");
        content.appendChild(taskDiv);

    };

    return { addButtonEventListeners, refreshPage, removeContents, addTaskToScreen };
};

// Add the today screen 
const todo = TodoController();

todo.addToday();