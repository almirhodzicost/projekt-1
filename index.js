/*import express from 'express';

const app = express();
const port = 3000;

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});*/

import dotenv from "dotenv";

// load config-file
dotenv.config({ path: `.env${process.env.NODE_ENV ? `-${process.env.NODE_ENV}` : ''}` });

const app = (await import('./app.js')).app;

const hostname = 'localhost';
const port = process.env.PORT || 3000;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
