import { todoService } from "../services/todo-service.js";
import {todoStorage} from "../storage/todo-storage.js";

export class TodoController {
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

                    if (confirm("Eintrag: \"" + todoTitle + "\" löschen ?")) {
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
                    
                    const titleInput = document.querySelector("#title");
                    const descriptionInput = document.querySelector("#description");
                    const dueDateInput = document.querySelector("#due_date");
                    const importanceInput = document.querySelector("#importance");
                    const completedInput = document.querySelector("#completed");
                    
                    titleInput.value = todoIndex.title;
                    descriptionInput.value = todoIndex.description;
                    dueDateInput.value = todoIndex.dueDate;
                    importanceInput.value = todoIndex.importance;
                    completedInput.value = todoIndex.completed;
                    //save item in localstorage
                    //localStorage.setItem("todoIndex", JSON.stringify(todoIndex));
                });
            });
        }
    }



    addTodo(todo) {
        const randomId = Math.floor(Math.random() * 1000);

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

        // Extract the data from the form.
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
            createdAt: new Date(),
            creationDate: new Date()
        };

        // Add the new todo item.
        const randomId = Math.floor(Math.random() * 598989816519819);

        this.addTodo({
            id:randomId,
            ...todo,
        });

        // Reset the form.
        this.formTodo.reset();
        
        let modal = document.getElementById("myModal");

        modal.style.display = "none";

        // redirect to index.html
        //window.location.href = "/";
    }
}

export const todoController = new TodoController();
