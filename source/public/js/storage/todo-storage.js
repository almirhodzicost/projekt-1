export class TodoStorage {

    constructor() {

        const storedTodos = localStorage.getItem("todos");

        if (storedTodos) {
            this.todos = JSON.parse(storedTodos);
        } else {
            this.todos = [
                {
                    id: 323027325235802,
                    title: "Einkaufen",
                    description: "Orangensaft, Salat Müsliriegel",
                    completed: false,
                    importance: 1,
                    createdAt: "2021-05-01",
                    dueDate: "2021-05-01",
                },
                {
                    id: 124077173435056,
                    title: "Sport",
                    description: "Fitness Training im Studio",
                    completed: false,
                    importance: 4,
                    createdAt: "2021-05-01",
                    dueDate: "2021-05-01"
                },
            ];
            this.saveTodos();
        }
    }

    saveTodos() {
        console.log("saveTodos");
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }

    addTodo(todo) {
        this.todos.push(todo);
        this.saveTodos();
    }

    deleteTodoById(id) {
        const todoIndex = this.todos.findIndex((todo) => todo.id === parseInt(id));
        this.todos.splice(todoIndex, 1);
        this.saveTodos();
    }
}

export const todoStorage = new TodoStorage();
