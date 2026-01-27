// script.js

// 1. State Management
let tasks = [];

// 2. Selectors
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// 3. Functions
function addTask() {
    const text = taskInput.value.trim();
    
    // Basic Validation
    if (text === "") {
        console.warn("Input is empty");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);
    taskInput.value = ""; // Clear input
    renderTasks();
}

function renderTasks() {
    // Clear current list to avoid duplicates
    taskList.innerHTML = "";

    tasks.forEach(task => {
        // Create elements safely
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);
        if (task.completed) li.classList.add('completed');

        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = task.text;

        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.textContent = 'Delete';

        li.append(span, delBtn);
        taskList.appendChild(li);
    });
    
    console.log("Current State:", tasks);
}

// 4. Event Delegation (Handling dynamic elements)
taskList.addEventListener('click', (e) => {
    const id = Number(e.target.parentElement.getAttribute('data-id'));

    if (e.target.classList.contains('task-text')) {
        // Toggle Completed
        tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    } 
    
    if (e.target.classList.contains('delete-btn')) {
        // Delete Task
        tasks = tasks.filter(t => t.id !== id);
    }

    renderTasks();
});

// 5. Listeners for Adding
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});