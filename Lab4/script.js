// A class represents one task.
class Task {
    constructor(description) {
        this.description = description;
        this.completed = false;
    }
}

// Store all tasks in an array.
const tasks = [];

// Get the HTML elements.
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const message = document.getElementById("message");

// Add a task when the button is clicked.
addButton.addEventListener("click", addTask);

// Also allow the Enter key to add a task.
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const description = taskInput.value.trim();

    if (description === "") {
        message.textContent = "Please enter a task first.";
        return;
    }

    const task = new Task(description);
    tasks.push(task);

    taskInput.value = "";
    message.textContent = "";
    renderTasks();
    taskInput.focus();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function renderTasks() {
    // Clear the current list before drawing it again.
    taskList.innerHTML = "";

    // Display every task in the array.
    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.className = "task-item";

        if (task.completed) {
            listItem.classList.add("completed");
        }

        const taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.textContent = task.description;
        taskText.title = "Click the task text to change its completion status";
        taskText.addEventListener("click", () => toggleTask(index));

        const completeButton = document.createElement("button");
        completeButton.className = "complete-button";
        completeButton.textContent = task.completed ? "↩ Undo" : "✓ Done";
        completeButton.setAttribute("aria-label", task.completed ? "Mark task incomplete" : "Mark task complete");
        completeButton.addEventListener("click", () => toggleTask(index));

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "✕ Delete";
        deleteButton.setAttribute("aria-label", "Delete task");
        deleteButton.addEventListener("click", () => deleteTask(index));

        listItem.appendChild(taskText);
        listItem.appendChild(completeButton);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    });

    emptyMessage.style.display = tasks.length === 0 ? "block" : "none";
}
