import { todoService } from "../services/todo-service.js";

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

    }

    loadTodos() {

        this.todos = this.todoService.getAllTodos();
        let todoHTML = "";

        function todoCompleted(completed){
            if (this.completed === true) {
                return "jepp";
            } else {
                return "nou";
            }
        }

        if (this.todoTemplateCompiled) {
            this.todos.forEach((todo) => {
                const todoTemplate = this.todoTemplateCompiled(todo);
                todoHTML += todoTemplate;
            });
        }

        if (this.todoList) {

            this.todoList.innerHTML = todoHTML;

            const deleteButtons = this.todoList.querySelectorAll(
                ".listItem__buttons__deleteButton"
            );

            console.log("deleteButtons: ", deleteButtons);

            deleteButtons.forEach((deleteButton) => {
                deleteButton.addEventListener("click", (event) => {
                    console.log("Delete button clicked");
                    const todoId = event.target.dataset.id;
                    this.deleteTodoById(todoId);
                });
            });

        }

        const newObject = window.localStorage.getItem("todos");
        console.log(newObject);

    }



    addTodo(todo) {
        const randomId = Math.floor(Math.random() * 1000000);

        this.todoService.createTodo({
            id: randomId+1,
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

        // redirect to index.html
        window.location.href = "/";
    }
}

export const todoController = new TodoController();
