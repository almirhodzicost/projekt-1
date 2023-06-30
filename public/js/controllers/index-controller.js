import { taskService } from '../services/task-service.js';
import { closeDialog, closeTask, openTask, showDialog } from './controller-components.js';


document.addEventListener('DOMContentLoaded', () => {
    renderAllTasks("sortByDate", "asc");
});


// Render all Tasks
const taskContainer = document.querySelector(".task-list");  // desination to display all tasks
const tasksRenderer = Handlebars.compile(document.querySelector("#tasks-template").innerHTML); // Handlebar compiler


async function renderAllTasks(currentSortOption, currentSortOrder, filterCompleted) {
    if (currentSortOption === "sortByDate") {
        taskContainer.innerHTML = tasksRenderer({
            task: await taskService.getAllTask("sortByDate", currentSortOrder, filterCompleted),
        });
    }
    else if (currentSortOption === "sortByTask") {
        taskContainer.innerHTML = tasksRenderer({
            task: await taskService.getAllTask("sortByTask", currentSortOrder, filterCompleted),
        });
    }
    else if (currentSortOption === "sortByPriority") {
        taskContainer.innerHTML = tasksRenderer({
            task: await taskService.getAllTask("sortByPriority", currentSortOrder, filterCompleted),
        });
    }
}


// Open dialog with + Create button and close dialog
const createBtn = document.getElementById('openDialog');
const closeBtn = document.querySelector('.close');
const dialogOverlay = document.querySelector('.dialog-overlay');
const dialogBox = document.querySelector('.dialog-box');

createBtn.addEventListener('click', () => {
    showDialog(dialogOverlay, dialogBox);
});

closeBtn.addEventListener('click', () => {
    closeDialog(dialogOverlay, dialogBox);
});

dialogOverlay.addEventListener('click', (event) => {
    if (event.target === dialogOverlay) {
        closeDialog(dialogOverlay, dialogBox);
    }
});


// Submit and save a new Task within dialog
const newTaskBtn = document.getElementById('newTaskBtn');

const getNewTitle = document.getElementById('newTaskTitle');
const getNewContent = document.getElementById('newTaskContent');
const getNewDate = document.getElementById('newTaskDate');
const getNewPriority = document.getElementById('newTaskPriority');



newTaskBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const newTaskTitle = getNewTitle.value;
    const newTaskContent = getNewContent.value;
    const newTaskDate = getNewDate.value;
    const newTaskPriority = getNewPriority.value;
    
    const newTask = {
        title: newTaskTitle,
        content: newTaskContent,
        duedate: newTaskDate,
        priority: newTaskPriority,
    };
    
    await taskService.addTask(newTask);
    closeDialog(dialogOverlay, dialogBox);
    renderAllTasks(currentSortOption, currentSortOrder);
})


// Select and display a task on dialog "Task details"
const taskFormElement = document.querySelector('.task-list'); // trigger to fire the function "select and display function" below

const openTaskDetail = document.querySelector('.task-detail');
const closeTaskBtn = document.querySelector('.close-task');

const editTaskForm = document.querySelector('.edit-task-container') // desination to display the selected task
const renderTask = Handlebars.compile(document.querySelector("#edit-tasks-template").innerHTML); // Handlebar compiler

taskFormElement.addEventListener('click', async (event) => {
    if (event.target.classList.contains('edit-task-btn')) { // read edit button
        
        const taskId = event.target.parentElement.dataset.id; // find the id assigned within handlebar template
        const task = await taskService.getTask(taskId)
        
        async function retrieveTask() {
            editTaskForm.innerHTML = renderTask(await taskService.getTask(taskId)) // get server response to retrieve task elements
        }
        
        retrieveTask() // render and display the selected task on in the dialog
        openTask(openTaskDetail) // open dialog for task details
    }
    renderAllTasks(currentSortOption, currentSortOrder);
})

closeTaskBtn.addEventListener('click', () => {
    closeTask(openTaskDetail);
});


// Edit and update the selected task
const editTaskDetail = document.querySelector('.edit-task-container');

editTaskDetail.addEventListener('click', async (event) => {
    if (event.target.classList.contains('update-task-btn')) { // read update button
        
        const taskId = event.target.parentElement.dataset.id; // find the id assigned within handlebar template
        
        const editTitleElement = document.querySelector('#editTitle'); // read input class
        const editContentElement = document.querySelector('#editContent');
        const editDueDateElement = document.querySelector('#editDueDate');
        const editPriorityElement = document.querySelector('#editPriority');
        const editStatusElement = document.querySelector('#editStatus');
        
        
        const updatedTask = { // read new value from input fields
            title: editTitleElement.value,
            content: editContentElement.value,
            duedate: editDueDateElement.value,
            priority: editPriorityElement.value,
            state: editStatusElement.checked,
        };
        
        await taskService.updateTask(taskId, updatedTask) // get server response to update task elements
        renderAllTasks(currentSortOption, currentSortOrder, filterCompleted);
    }
    
    if (event.target.classList.contains('delete-task-btn')) { // read delete button
        
        const taskId = event.target.parentElement.dataset.id;
        
        await taskService.deleteTask(taskId) // get server response to set DELETE state the selected task
        renderAllTasks(currentSortOption, currentSortOrder, filterCompleted);
    }
});


// Apply sort function by date, task or priority
let currentSortOption = "sortByDate"; // default sort option by duedate
let currentSortOrder = "asc"; // default sort order, ascending

const sortByTaskBtn = document.querySelector('#sortByTaskBtn');
const sortByDueDateBtn = document.querySelector('#sortByDueDateBtn');
const sortByPriorityBtn = document.querySelector('#sortByPriorityBtn');

function handleSortInput(sortOption) {
    return async (event) => {
        event.preventDefault();
        if (currentSortOption === sortOption) {
            currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
        }
        else {
            currentSortOption = sortOption;
            currentSortOrder = 'asc';
        }
        
        await renderAllTasks(currentSortOption, currentSortOrder);
        
    };
}


sortByTaskBtn.addEventListener('click', handleSortInput('sortByTask'));
sortByDueDateBtn.addEventListener('click', handleSortInput('sortByDate'));
sortByPriorityBtn.addEventListener('click', handleSortInput('sortByPriority'));



// Apply filter to hide completed tasks
const filterTaskBtn = document.querySelector('#filterTaskBtn');

let filterCompleted = false; // Default state to show completed tasks

filterTaskBtn.addEventListener('click', async () => {
    filterCompleted = !filterCompleted; // Toggle the filter state
    
    await renderAllTasks(currentSortOption, currentSortOrder, filterCompleted);
    
    filterTaskBtn.textContent = filterCompleted ? 'Show all tasks' : 'Hide completed';
});


// Toggle for "Dark theme"
const darkModeBtn = document.getElementById('darkMode');
darkModeBtn.addEventListener('click', (event) => {
    event.preventDefault();
    document.body.classList.toggle('dark-mode');
    
    /* filterTaskBtn.textContent = filterCompleted ? 'Show all tasks' : 'Hide completed'; */
});