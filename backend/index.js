const tasksRoutes = require('./routes/tasks');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');
const app = express();

const port = process.env.PORT;

db();

app.use(cors());
app.use(express.json());
app.use('/api/tasks', tasksRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}...`));
