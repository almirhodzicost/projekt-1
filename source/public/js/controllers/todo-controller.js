import { todoService } from "../services/todo-service.js";
import { helper } from "./helper.js";

export class TodoController {
    
    // Create Unique ID
    // ===================================================
    UniqueId() {
        const d = new Date();
        let ms = d.getMilliseconds();
        return Math.floor(Math.random() * 65465165651646416 + ms);
    }
    // ---------------------------------------------------
    
    // Constructor
    // ===================================================
    constructor() {
        const todoTemplateElement = helper.qS("#todo-list-template");
        if (todoTemplateElement) {
            this.todoTemplateCompiled = Handlebars.compile(todoTemplateElement.innerHTML);
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
        let modal = helper.gE("myModal");
        let btn = helper.gE("myBtn");
        let div = helper.gE("myDiv");
        let span = helper.gECN("close")[0];
        
        btn.onclick = () => {
            modal.style.display = "block";
            this.formTodo.reset();
            
            helper.showActionButton("save");
            
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
        return `${day}.${month}.${year}`;
    }
    // ---------------------------------------------------

    // Load Todos
    // ===================================================

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
            const deleteButtons = this.todoList.querySelectorAll("[data-postaction='delete']");
            const editButtons = this.todoList.querySelectorAll("[data-postaction='edit']");
            const updateButton = helper.qS("#updateItemButton");
            
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
                    const btn = helper.gE("myBtn");
                    const div = helper.gE("myDiv");
                    const span = helper.gECN("close")[0];

                    modal.style.display = "block";
                    
                    helper.showActionButton("update");
                    
                    if (document.body.classList.contains("dark-theme")) {
                        div.style.backgroundColor = "#222231";
                    } else {
                        div.style.backgroundColor = "#ffffff";
                    }
                    
                    const todoId = event.target.dataset.todoid;
                    const todoIndex = todoService.todoStorage.todos.find((todo) => todo.id === parseInt(todoId));

                    const id = helper.qS("#id");
                    const title = helper.qS("#title");
                    const description = helper.qS("#description");
                    const dueDate = helper.qS("#due_date");
                    const importance = helper.qS("#importance");
                    const completed = helper.qS("#completed");
                    
                    id.value = todoIndex.id;
                    title.value = todoIndex.title;
                    description.value = todoIndex.description;
                    dueDate.value = todoIndex.dueDate;
                    importance.value = todoIndex.importance;
                    completed.value = todoIndex.completed;
                });
            });
            
            updateButton.addEventListener("click", (event) => {
                const id = helper.qS("#id");
                const title = helper.qS("#title");
                const description = helper.qS("#description");
                const dueDate = helper.qS("#due_date");
                const importance = helper.qS("#importance");
                const completed = helper.qS("#completed");
                const modal = helper.gE("myModal");
                
                const todoId = id.value;
                const todoIndex = todoService.todoStorage.todos.find((todo) => todo.id === parseInt(todoId));
                
                todoIndex.title = title.value;
                todoIndex.description = description.value;
                todoIndex.dueDate = dueDate.value;
                todoIndex.importance = importance.value;
                todoIndex.completed = helper.cBChecked(completed);

                this.updateTodoById(todoId, todoIndex);
                modal.style.display = "none";
            });
        }
    }
    // ---------------------------------------------------
    
    
    // Add Todos
    // ===================================================
    addTodo(todo) {
        const randomId = this.UniqueId();
        this.todoService.createTodo({
            id: randomId,
            ...todo,
        });
        this.loadTodos();
    }
    // ---------------------------------------------------
    
    
    // Delete Todos
    // ===================================================
    deleteTodoById(id) {
        this.todoService.deleteTodoById(id);
        this.loadTodos();
    }
    // ---------------------------------------------------
    
    
    // Update Todos
    // ===================================================
    updateTodoById(id, updatedTodo) {
        todoService.updateTodoById(id, updatedTodo);
        this.loadTodos();
    }
    // ---------------------------------------------------
    
    
    // Form handle
    // ===================================================
    handleformTodoSubmit(event) {
        event.preventDefault();
        // Data from the form.
        // ===================================================
        const title = helper.qS("#title");
        const description = helper.qS("#description");
        const dueDate = helper.qS("#due_date");
        const importance = helper.qS("#importance");
        const completed = helper.qS("#completed");

        function CheckBoxCompleted(input) {
            return completed.checked;
        }

        const todo = {
            title: title.value,
            description: description.value,
            dueDate: dueDate.value,
            importance: importance.value,
            completed: CheckBoxCompleted(completed.value),
            createdAt: new Date(),
            creationDate: new Date(),
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
    // ---------------------------------------------------
}

export const todoController = new TodoController();
