import { todoStorage } from "../storage/todo-storage.js";

export class TodoService {

    constructor() {
        this.todoStorage = todoStorage;
    }

    getAllTodos() {
        return this.todoStorage.todos;
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
    }
}

export const todoService = new TodoService();
