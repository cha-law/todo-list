import "./styles.css";

function TodoController() {
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
            }
        };
    };

    function createProject() {

    };

    function createTask(title, time, priority) {
        let newTask = new Task(title, time, priority);
        localStorage.setItem("task", JSON.stringify(newTask)); // needs to not override if same name
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

    return { removeContents };
};

TodoController().createTask("eat breakfast", 1130, "high")