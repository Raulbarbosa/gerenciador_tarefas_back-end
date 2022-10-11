const knex = require('../../connection');
const bcrypt = require('bcrypt');

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

        const user = await knex('users').insert({ nome, email, senha: await bcrypt.hash(senha, 10) }).returning(["id", "nome", "email"]);

        if (!user) {
            return res.status(400).json({ message: "Não foi possível criar o usuário." })
        }

        return res.status(200).json(user[0])

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const getUser = async (req, res) => {
    const { id } = req.params;

    try {

        const user = await knex.select('id', 'nome', 'email').from('users').where({ id }).first();

        if (!user) {
            return res.status(404).json({ message: "usuário não encontrado." });
        }

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
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