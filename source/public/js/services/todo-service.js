import { todoStorage } from "../storage/todo-storage.js";

export class TodoService {

    constructor() {
        this.todoStorage = todoStorage;
    }

    getAllTodos() {
         return [...this.todoStorage.todos].sort((a, b) => {
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
            return 0;
        });
        
    }

    getTodoById(id) {
        return this.todoStorage.todos.find((todo) => todo.id === id);
    }

    createTodo(todo) {
        this.todoStorage.addTodo(todo);
    }

    deleteTodoById(id) {
        this.todoStorage.deleteTodoById(id);
    }
    
    updateTodoById(id, updatedTodo) {
        const todoIndex = this.todoStorage.todos.findIndex((todo) => todo.id === id);
        this.todoStorage.todos[todoIndex] = updatedTodo;
        this.todoStorage.saveTodos();
    }
}

export const todoService = new TodoService();
