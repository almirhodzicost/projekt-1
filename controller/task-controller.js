import { taskStore } from '../services/task-store.js'

export class TaskController {
    
    getAllTasks = async (req, res) => {
        const sortBy = req.query.sortBy || 'title';
        const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
        res.json(await taskStore.all(req.query.query, sortBy, sortOrder));
    };
    
    addTask = async (req, res) => {
        res.json(await taskStore.add(
            req.body.title,
            req.body.description,
            req.body.importance,
            req.body.dueDate,
            req.body.createdAt,
            req.body.completed,
        ));
    };
    
    getTask = async (req, res) => {
        res.json(await taskStore.get(req.params.id));
    };
    
    updateTask = async (req, res) => {
        res.json(await taskStore.update(
            req.params.id,
            req.body.title,
            req.body.description,
            req.body.importance,
            req.body.dueDate,
            req.body.completed,
        ));
    };
    
    deleteTask = async (req, res) => {
        res.json(await taskStore.delete(req.params.id)); // TODO should return 402 if not ok
    };
}

export const taskController = new TaskController();