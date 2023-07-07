import { httpService } from './http-service.js'
class TaskService {
    
    async getAllTask(sortBy, sortOrder) {
        let url = `/task/?sortBy=${sortBy}&sortOrder=${sortOrder}`;
        return httpService.ajax("GET", url);
    }
    
    async deleteTask(id) {
        return httpService.ajax("DELETE", `/task/${id}`);
    }
    
    async addTask(task) {
        return httpService.ajax("POST", "/task/", {
            title: task.title,
            description: task.description,
            importance: task.importance,
            dueDate: task.dueDate,
            completed: task.completed
        });
    }
    
    async getTask(id) {
        return httpService.ajax("GET", `/task/${id}`, undefined);
    }
    
    async updateTask(_id, task) {
        return httpService.ajax("PATCH", `/task/${_id}`, {
            title: task.title,
            description: task.description,
            importance: task.importance,
            dueDate: task.dueDate,
            completed: task.completed,
        });
    }
}

export const taskService = new TaskService();

