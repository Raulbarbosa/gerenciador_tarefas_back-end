const express = require("express");
const { createUser, getUser, updateUser, deleteUser } = require("./controllers/users");

const routes = express();

routes.post('/users', createUser);
routes.get('/users/:id', getUser);
routes.put('/users/:id', updateUser);
routes.delete('/users/:id', deleteUser)

module.exports = routes;