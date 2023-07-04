import Datastore from 'nedb-promises'

export class TaskManager {
    constructor(title, description, importance, dueDate, createdAt, completed) {
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.dueDate = new Date(dueDate);
        this.createdAt = new Date();
        this.completed = completed;
    }
}

export class TaskStore {
    constructor(db) {
        const options = process.env.DB_TYPE === "FILE" ? {filename: './data/task.db', autoload: true} : {}
        this.db = db || new Datastore(options);
    }
    
    async add(title, description, importance, dueDate, createdAt, completed) {
        let task = new TaskManager(title, description, importance, dueDate, createdAt, completed);
        return this.db.insert(task);
    }
    
    async delete(id) {
        await this.db.update({ _id: id }, { $set: { completed: false } });
        return this.get(id);
    }
    
    async get(id) {
        return this.db.findOne({ _id: id }).exec();
    };
    
    async update(id, title, description, importance, dueDate, completed) {
        await this.db.update({ _id: id }, {
            $set: {
                "title": title,
                "description": description,
                "importance": importance,
                "dueDate": dueDate,
                "completed": completed
            }
        });
        return this.get(id);
    }
    
    async all(query, sortBy, sortOrder, filterCompleted) {
        let dbQuery = {
            completed: filterCompleted
        };
        if (filterCompleted) {
            dbQuery.$and.push({ $or: [{ completed: true }] });
        }
        if (sortBy === "createdAt") {
            return this.db.find(dbQuery).sort({ createdAt: sortOrder }).exec();
        }
        if (sortBy === "title") {
            return this.db.find(dbQuery).sort({ title: sortOrder }).exec();
        }
        else if (sortBy === "importance") {
            return this.db.find(dbQuery).sort({ importance: sortOrder }).exec();
        }
        else if (sortBy === "completed") {
            return this.db.find(dbQuery).sort({ completed: sortOrder }).exec();
        }
        else {
            return this.db.find(dbQuery).sort({ dueDate: sortOrder }).exec();
        }
    }
}

export const taskStore = new TaskStore();
