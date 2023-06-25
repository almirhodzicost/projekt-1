import { todoStorage } from "../storage/todo-storage.js";

export class TodoService {
    constructor() {
        this.todoStorage = todoStorage;
    }
    
    getAllTodos(sortBy , sortOrder) {
        return [...this.todoStorage.todos].sort((a, b) => {
            if (sortBy === 'completed') {
                if (a[sortBy] === b[sortBy]) {
                    return 0;
                }
                // Wenn completed, sortiere true vor false, abhängig von der Sortierreihenfolge
                return sortOrder === 'asc'
                    ? a[sortBy] ? -1 : 1
                    : a[sortBy] ? 1 : -1;
            } else {
                // Sortiere nach Titel oder einem anderen String-Feld, abhängig von der Sortierreihenfolge
                if (a[sortBy] < b[sortBy]) {
                    return sortOrder === 'asc' ? -1 : 1;
                }
                if (a[sortBy] > b[sortBy]) {
                    return sortOrder === 'asc' ? 1 : -1;
                }
                return 0;
            }
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
