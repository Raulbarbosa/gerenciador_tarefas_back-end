const express = require("express");
const login = require("./controllers/login");
const { createUser, getUser, updateUser, deleteUser } = require("./controllers/users");
const authenticated = require("./services/authenticated");

const routes = express();

routes.post('/login', login);
routes.post('/users', createUser);

routes.use(authenticated);

routes.get('/users', getUser);
routes.put('/users', updateUser);
routes.delete('/users', deleteUser);

module.exports = routes;