import Datastore from 'nedb-promises'

export class TaskManager {
    constructor(title, description, importance, dueDate, createdAt, completed) {
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.dueDate = dueDate;
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
        this.db.remove({ _id: id } );
        //return this.get(id);
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
    
    async all(query, sortBy, sortOrder) {
        if (sortBy === "createdAt") {
            return this.db.find().sort({ createdAt: sortOrder }).exec();
        }
        else if (sortBy === "dueDate") {
            return this.db.find().sort({ dueDate: sortOrder }).exec();
        }
        else if (sortBy === "title") {
            return this.db.find().sort({ title: sortOrder }).exec();
        }
        else if (sortBy === "importance") {
            return this.db.find().sort({ importance: sortOrder }).exec();
        }
        else if (sortBy === "completed") {
            return this.db.find().sort({ completed: sortOrder }).exec();
        }
        else {
            return this.db.find().exec();
        }
    }
}

export const taskStore = new TaskStore();
