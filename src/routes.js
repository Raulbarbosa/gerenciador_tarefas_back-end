const express = require("express");
const { createUser } = require("./controllers/users");

const routes = express();

routes.get('/', (req, res) => {
    res.send('Hello World!');
})

routes.post('/users', createUser);

module.exports = routes;