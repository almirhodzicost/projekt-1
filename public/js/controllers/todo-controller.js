import { taskService } from '../services/task-service.js';
import { todoService } from "../services/todo-service.js";
import { helper } from "./helper.js";

export class TodoController {
  
    // Constructor
    // ===================================================
    constructor() {
        const todoTemplateElement = helper.qS("#todo-list-template");
        if (todoTemplateElement) {
            // eslint-disable-next-line no-undef
            this.todoTemplateCompiled = Handlebars.compile(todoTemplateElement.innerHTML);
        }

        this.taskService = taskService;
        this.todoList = document.querySelector("#todoList");

        window.addEventListener("load", () => {
            this.formTodo = document.querySelector("#formTodo");
            if (this.formTodo) {
                this.formTodo.addEventListener("submit", (event) =>
                    this.handleformTodoSubmit(event)
                );
            }
        });

        // Sorting Buttons
        // ===================================================
        const buttons = document.querySelectorAll("#SortingAction .btn");
        
        buttons.forEach(function(button) {
            button.addEventListener('click', function(e) {
                const sortType = e.target.dataset.actionsort;
                
                const storedSorting = localStorage.getItem("todos_sort");
                const parseStoredSorting = JSON.parse(storedSorting);
                const storedSortBy = parseStoredSorting.sortBy;
                const storedSortOrder = parseStoredSorting.sortOrder;

                if(storedSortBy===sortType && storedSortOrder==='desc'){
                    const sortOrder = 'asc';
                    todoService.sortingTodos(sortType, sortOrder);
                } else {
                    todoService.sortingTodos(sortType, 'desc');
                }
                todoController.loadTodos(this.storedSortBy,this.storedSortOrder);
            });
        });
        
        // Modal
        // ===================================================
        let modal = helper.gE("myModal");
        let btn = helper.gE("myBtn");
        let div = helper.gE("myDiv");
        let span = helper.gECN("close")[0];
        
        btn.onclick = () => {
            modal.style.display = "block";
            this.formTodo.reset();
            const modus = helper.gE("modus");
            modus.textContent = "Create";
            
            if (document.body.classList.contains("dark-theme")) {
                div.style.backgroundColor = "#222231";
            } else {
                div.style.backgroundColor = "#ffffff";
            }
        }
        
        span.onclick = function() {
            modal.style.display = "none";
        }
        
        window.onclick = (event) => {
            if (event.target == modal) {
                this.formTodo.reset();
                modal.style.display = "none";
            }
        }
        // ---------------------------------------------------
    }
    // ---------------------------------------------------

    // Current Date
    // ===================================================
    currentDate() {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (day < 10) { day = '0' + day; }
        if (month < 10) { month = '0' + month; }
        return `${year}-${month}-${day}`;
    }
    
    formatDate(value) {
        const date = new Date(value);
        let days = date.getDate();
        let months = date.getMonth() + 1;
        let years = date.getFullYear();
        if (days < 10) { days = '0' + days; }
        if (months < 10) { months = '0' + months; }
        return `${years}-${months}-${days}`;
    }

    // ---------------------------------------------------
    // Load Todos
    // ===================================================
    async loadTodos(a, b) {
        a, b;
        const storedSorting = localStorage.getItem("todos_sort");
        const parseStoredSorting = JSON.parse(storedSorting);
        this.todos = await taskService.getAllTask(parseStoredSorting.sortBy, parseStoredSorting.sortOrder);

        document.querySelectorAll('.btn.btn-order').forEach((el) => {
            el.classList.remove('active','asc','desc');
        });
        
        if(parseStoredSorting.sortBy === parseStoredSorting.sortBy) {
            const sortbyCompleted = helper.qS('[data-actionsort="'+parseStoredSorting.sortBy+'"]');
            sortbyCompleted.classList.add('active',parseStoredSorting.sortOrder);
        }

        let todoHTML = "";
        
        if (this.todoTemplateCompiled) {
            this.todos.forEach((todo) => {
                const todoTemplate = this.todoTemplateCompiled(todo);
                todoHTML += todoTemplate;
            });
        }
        
        if (this.todoList) {
            this.todoList.innerHTML = todoHTML;
            const deleteButtons = this.todoList.querySelectorAll("[data-postaction='delete']");
            const editButtons = this.todoList.querySelectorAll("[data-postaction='edit']");
            
            deleteButtons.forEach((deleteButton) => {
                deleteButton.addEventListener("click", (event) => {
                    const todoId = event.target.dataset.todoid;
                    const todoTitle = event.target.dataset.todotitle;
                    if (confirm("Delete \"" + todoTitle + "\" todo?")) {
                        this.deleteTodoById(todoId);
                    }
                });
            });
            
            editButtons.forEach((editButton) => {
                editButton.addEventListener("click", (event) => {
                    const modal = helper.gE("myModal");
                    const div = helper.gE("myDiv");
                    const modus = helper.gE("modus");
                    const todoId = event.target.dataset.todoid;
                    const todoIndex = this.todos.find((todo) => todo._id === todoId);
                    const id = helper.qS("#id");
                    const title = helper.qS("#title");
                    const description = helper.qS("#description");
                    const dueDate = helper.qS("#due_date");
                    const importance = helper.qS("#importance");
                    const completed = helper.qS("#completed");
                    
                    modus.textContent = "Edit";
                    modal.style.display = "block";
                    
                    if (document.body.classList.contains("dark-theme")) {
                        div.style.backgroundColor = "#222231";
                    } else {
                        div.style.backgroundColor = "#ffffff";
                    }
                    
                    if (todoIndex.completed === true) {
                        completed.checked = true;
                    }

                    id.value = todoIndex._id;
                    title.value = todoIndex.title;
                    description.value = todoIndex.description;
                    dueDate.value = this.formatDate(todoIndex.dueDate);
                    importance.value = parseInt(todoIndex.importance);
                    completed.value = todoIndex.completed;
                });
            });
        }
    }
    // ---------------------------------------------------
    
    // Add Todos
    // ===================================================
    async addTodo(todo) {
        await this.taskService.addTask(todo);
        await this.loadTodos();
    }
    // ---------------------------------------------------
    
    // Delete Todos
    // ===================================================
   async deleteTodoById(id) {
        this.taskService.deleteTask(id);
        this.loadTodos();
    }
    // ---------------------------------------------------
    
    // Form handle
    // ===================================================
    async handleformTodoSubmit(event) {
        event.preventDefault();
        // Data from the form.
        // ===================================================
        const todoId = document.querySelector("#id");
        const title = document.querySelector("#title");
        const description = document.querySelector("#description");
        const dueDate = document.querySelector("#due_date");
        const importance = document.querySelector("#importance");
        const completed = document.querySelector("#completed");
        function CheckBoxCompleted() { return completed.checked;}

        const todo = {
            title: title.value,
            description: description.value,
            dueDate: dueDate.value,
            importance: parseInt(importance.value),
            createdAt: this.currentDate(),
            completed: CheckBoxCompleted(completed.value)
        };

        if(todoId.value !== "")
        {
            // Update todo
            // ===================================================
            const todoUpdate = this.todos.find((todo) => todo._id === todoId.value);
            todoUpdate.title = title.value;
            todoUpdate.description = description.value;
            todoUpdate.dueDate = this.formatDate(dueDate.value);
            todoUpdate.importance = parseInt(importance.value);
            todoUpdate.completed = helper.cBChecked(completed);
            
            await this.taskService.updateTask(todoUpdate._id, todoUpdate);
            todoId.value = null;
            // ---------------------------------------------------
        } else {
            // Add todo
            // ===================================================
            await this.addTodo(todo);
            // ---------------------------------------------------
        }
        await this.loadTodos();
        // Reset the form.
        // ===================================================
        this.formTodo.reset();
        const modal = helper.gE("myModal");
        modal.style.display = "none";
        // ---------------------------------------------------
    }
    // ---------------------------------------------------
}

export const todoController = new TodoController();
