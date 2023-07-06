import { httpService } from './http-service.js'
import { helper} from "../controllers/helper.js";

class TaskService {
    
    formatDate(value) {
        const date = new Date(value);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        
        if (month < 10) {
            month = '0' + month;
        }
        
        return `${year}-${month}-${day}`;
    }
    
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

