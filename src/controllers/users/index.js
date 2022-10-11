const knex = require('../../connection');

const createUser = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json("Todos os campos devem ser preenchidos.")
    }

    try {

        const userAlreadyExists = await knex('users').where({ email }).first();

        if (userAlreadyExists) {
            return res.status(400).json({ message: "usuário já cadastrado" });
        }

        const user = await knex('users').insert({ nome, email, senha }).returning(["id", "nome", "email"]);

        if (!user) {
            return res.status(400).json({ message: "Não foi possível criar o usuário." })
        }

        return res.status(200).json(user[0])

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const getUser = async (req, res) => {

}

const getAllUsers = async (req, res) => {

}

const updateUser = async (req, res) => {

}

const deleteUser = async (req, res) => {

}

module.exports = {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
}