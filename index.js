import dotenv from "dotenv";

// load config-file
dotenv.config({ path: `.env${process.env.NODE_ENV ? `-${process.env.NODE_ENV}` : ''}` });
//const options = process.env.DB_TYPE === "FILE" ? {filename: './data/task.db', autoload: true} : {}

const app = (await import('./app.js')).app;

const hostname = 'localhost';
const port = process.env.PORT || 3000;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
