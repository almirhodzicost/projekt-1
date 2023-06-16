import { todoService } from "../services/todo-service.js";
import { todoStorage } from "../storage/todo-storage.js";

export class TodoController {
    
    // Create Unique ID
    // ===================================================
    UniqueId() {
        const d = new Date();
        let ms = d.getMilliseconds();
        return Math.floor(Math.random() * 65465165651646416 + ms);
    }
    // ---------------------------------------------------
    
    CheckBoxed(input) {
        return input.checked;
    }
    
    constructor() {

        const todoTemplateElement = document.querySelector("#todo-list-template");

        if (todoTemplateElement) {
            this.todoTemplateCompiled = Handlebars.compile(
                todoTemplateElement.innerHTML
            );
        }

        this.todoService = todoService;
        this.todoList = document.querySelector("#todoList");

        window.addEventListener("load", () => {
            this.formTodo = document.querySelector("#formTodo");
            if (this.formTodo) {
                this.formTodo.addEventListener("submit", (event) =>
                    this.handleformTodoSubmit(event)
                );
            }
        });
        
        // Modal
        // ===================================================
        let modal = document.getElementById("myModal");
        let btn = document.getElementById("myBtn");
        let div = document.getElementById("myDiv");
        let span = document.getElementsByClassName("close")[0];
        
        btn.onclick = () => {
            modal.style.display = "block";
            this.formTodo.reset();
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

    currentDate() {
        const date = new Date();
        
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        
        return `${day}-${month}-${year}`;
    }
    
    loadTodos() {

        this.todos = this.todoService.getAllTodos();
        let todoHTML = "";

        if (this.todoTemplateCompiled) {
            this.todos.forEach((todo) => {
                const todoTemplate = this.todoTemplateCompiled(todo);
                todoHTML += todoTemplate;
            });
        }

        if (this.todoList) {
            
            this.todoList.innerHTML = todoHTML;
            const deleteButtons = this.todoList.querySelectorAll("[data-postaction=\"delete\"]");
            const editButtons = this.todoList.querySelectorAll("[data-postaction=\"edit\"]");
 
            deleteButtons.forEach((deleteButton) => {
                deleteButton.addEventListener("click", (event) => {
                    const todoId = event.target.dataset.todoid;
                    const todoTitle = event.target.dataset.todotitle;
                    if (confirm("Todo: \"" + todoTitle + "\" delete ?")) {
                        this.deleteTodoById(todoId);
                    }
                });
            });
            
            editButtons.forEach((editButton) => {
                editButton.addEventListener("click", (event) => {
                    let modal = document.getElementById("myModal");
                    let btn = document.getElementById("myBtn");
                    let div = document.getElementById("myDiv");
                    let span = document.getElementsByClassName("close")[0];
                    
                    modal.style.display = "block";
                    if (document.body.classList.contains("dark-theme")) {
                        div.style.backgroundColor = "#222231";
                    } else {
                        div.style.backgroundColor = "#ffffff";
                    }
                    
                    const todoId = event.target.dataset.todoid;
                    const todoIndex = todoStorage.todos.find((todo) => todo.id === parseInt(todoId));

                    const idInput = document.querySelector("#id");
                    const titleInput = document.querySelector("#title");
                    const descriptionInput = document.querySelector("#description");
                    const dueDateInput = document.querySelector("#due_date");
                    const importanceInput = document.querySelector("#importance");
                    const completedInput = document.querySelector("#completed");
                    
                    idInput.value = todoIndex.id;
                    titleInput.value = todoIndex.title;
                    descriptionInput.value = todoIndex.description;
                    dueDateInput.value = todoIndex.dueDate;
                    importanceInput.value = todoIndex.importance;
                    completedInput.value = todoIndex.completed;
                });
            });
            
            const updateButton = document.querySelector("#updateItemButton");
            updateButton.addEventListener("click", (event) => {
                
                const idInput = document.querySelector("#id");
                const titleInput = document.querySelector("#title");
                const descriptionInput = document.querySelector("#description");
                const dueDateInput = document.querySelector("#due_date");
                const importanceInput = document.querySelector("#importance");
                const completedInput = document.querySelector("#completed");
                const modal = document.getElementById("myModal");
                const todoId = idInput.value;
                const todoIndex = todoStorage.todos.find((todo) => todo.id === parseInt(todoId));
                
                todoIndex.title = titleInput.value;
                todoIndex.description = descriptionInput.value;
                todoIndex.dueDate = dueDateInput.value;
                todoIndex.importance = importanceInput.value;
                todoIndex.completed = completedInput.value;

                this.updateTodoById(todoId, todoIndex);
                modal.style.display = "none";
            });
        }
    }

    addTodo(todo) {
        const randomId = this.UniqueId();
        this.todoService.createTodo({
            id: randomId,
            ...todo,
        });
        this.loadTodos();
    }

    deleteTodoById(id) {
        this.todoService.deleteTodoById(id);
        this.loadTodos();
    }

    updateTodoById(id, updatedTodo) {
        this.todoService.updateTodoById(id, updatedTodo);
        this.loadTodos();
    }

    handleformTodoSubmit(event) {
        event.preventDefault();
        // Data from the form.
        // ===================================================
        const titleInput = document.querySelector("#title");
        const descriptionInput = document.querySelector("#description");
        const dueDateInput = document.querySelector("#due_date");
        const importanceInput = document.querySelector("#importance");
        const completedInput = document.querySelector("#completed");

        function CheckBoxCompleted(input) {
            return completedInput.checked;
        }

        const todo = {
            title: titleInput.value,
            description: descriptionInput.value,
            dueDate: dueDateInput.value,
            importance: importanceInput.value,
            completed: CheckBoxCompleted(completedInput.value),
            createdAt: this.currentDate(),
            creationDate: this.currentDate(),
        };

        const randomId = this.UniqueId();

        this.addTodo({
            id:randomId,
            ...todo,
        });

        // Reset the form.
        // ===================================================
        this.formTodo.reset();
        const modal = document.getElementById("myModal");
        modal.style.display = "none";
        // ---------------------------------------------------
    }
}

export const todoController = new TodoController();
