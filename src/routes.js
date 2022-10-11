const express = require("express");
const login = require("./controllers/login");
const { createUser, getUser, updateUser, deleteUser } = require("./controllers/users");

const routes = express();

routes.post('/login', login);

routes.post('/users', createUser);
routes.get('/users/:id', getUser);
routes.put('/users/:id', updateUser);
routes.delete('/users/:id', deleteUser)

module.exports = routes;