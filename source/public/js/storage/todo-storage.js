export class TodoStorage {
    
    constructor() {

        const storedTodos = localStorage.getItem("todos");
        const storedSorting = localStorage.getItem("todos_sort");
        const parsedSorting = JSON.parse(storedSorting);
 
        if (storedSorting) {
            this.saveSorting(parsedSorting.sortBy, parsedSorting.sortOrder);
        } else {
            this.saveSorting('createdAt', 'asc');
        }
        
        if (storedTodos) {
            this.todos = JSON.parse(storedTodos);
        } else {
            this.todos = [
                {
                    id: 1,
                    title: "Einkaufen",
                    description: "Orangensaft, Salat Müsliriegel",
                    completed: false,
                    importance: 1,
                    createdAt: "2021-05-01",
                    dueDate: "2021-05-01",
                },
                {
                    id: 2,
                    title: "Fitness",
                    description: "Fitness-Training im Studio",
                    completed: true,
                    importance: 4,
                    createdAt: "2021-05-04",
                    dueDate: "2021-05-10"
                },
                {
                    id: 3,
                    title: "Spazieren",
                    description: "Mit FiFi im Wald spazieren",
                    completed: true,
                    importance: 1,
                    createdAt: "2021-06-04",
                    dueDate: "2021-06-10"
                }
            ];
            this.saveTodos();
        }
    }

    saveTodos() {
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }
    
    saveSorting(a,b) {
        localStorage.setItem("todos_sort", JSON.stringify({sortBy: a, sortOrder: b}));
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
