const express = require("express");
const login = require("./controllers/login");
const { getTask, deleteTask, updateTask, createTask, getAllTasks } = require("./controllers/todoTasks");
const { createUser, getUser, updateUser, deleteUser } = require("./controllers/users");
const authenticated = require("./services/authenticated");

const routes = express();

routes.post('/login', login);
routes.post('/users', createUser);

routes.use(authenticated);

routes.get('/users', getUser);
routes.put('/users', updateUser);
routes.delete('/users', deleteUser);

routes.get('/tasks/:id', getTask);
routes.get('/tasks', getAllTasks);
routes.post('/tasks', createTask);
routes.put('/tasks/:id', updateTask);
routes.delete('/tasks/:id', deleteTask);


module.exports = routes;