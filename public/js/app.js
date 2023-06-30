"use strict";
import { todoController } from "./controllers/todo-controller.js";
import { themeToggle } from "./controllers/theme-controller.js";

themeToggle("#theme-toggler");

window.addEventListener("DOMContentLoaded", () => {
    const todoList = document.querySelector("#todoList");
    todoController.loadTodos(todoList);
});
