import Datastore from 'nedb-promises'

export class TaskManager {
    constructor(title, description, importance, dueDate, createdAt, completed) {
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.dueDate = new Date(dueDate);
        this.createdAt = new Date();
        this.completed = "false";
    }
}

export class TaskStore {
    constructor(db) {
        const options = process.env.DB_TYPE === "FILE" ? {filename: './data/task.db', autoload: true} : {}
        this.db = db || new Datastore(options);
    }
    
    async add(title, description, importance, dueDate, createdAt, completed) {
        console.log(this.dueDate)
        console.log(dueDate)
        
        let task = new TaskManager(title, description, importance, dueDate, createdAt, completed);
        return this.db.insert(task);
    }
    
    async delete(id) {
        await this.db.update({ _id: id }, { $set: { completed: "false" } });
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
            $and: [{ completed: { $ne: "false" } }],
        };
        if (filterCompleted) {
            dbQuery.$and.push({ $or: [{ completed: "true" }] });
        }
        if (sortBy === "sortByDate") {
            return this.db.find(dbQuery).sort({ dueDate: sortOrder }).exec();
        }
        else if (sortBy === "sortByTask") {
            return this.db.find(dbQuery).sort({ title: sortOrder }).exec();
        }
        else if (sortBy === "sortByimportance") {
            return this.db.find(dbQuery).sort({ importance: sortOrder }).exec();
        }
        else {
            return this.db.find(dbQuery).sort({ dueDate: sortOrder }).exec();
        }
    }
}

export const taskStore = new TaskStore();
