const express = require("express");
const { createUser, getUser } = require("./controllers/users");

const routes = express();

routes.post('/users', createUser);
routes.get('/users/:id', getUser)

module.exports = routes;