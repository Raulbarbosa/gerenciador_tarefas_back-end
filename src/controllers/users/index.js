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

        const userFound = await knex.select('id', 'nome', 'email').from('users').where({ id }).first();

        if (!userFound) {
            return res.status(404).json({ message: "usuário não encontrado." })
        }

        return res.status(200).json(userFound);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nome, senha } = req.body;

    try {

        const userFound = await knex('users').where({ id }).first();

        if (!userFound) {
            return res.status(404).json({ message: "usuário não encontrado." })
        }

        let newName = nome || userFound.nome;
        let newPassword = await bcrypt.hash(senha, 10) || userFound.senha;


        const updatedUser = await knex('users').where({ id }).update({ nome: newName, senha: newPassword }).returning(['id', 'nome', 'email']);

        if (!updatedUser) {
            return res.status(404).json({ message: "Não foi possível atualizar o usuário." })
        }

        return res.status(200).json({ updatedUser })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {

        const userFound = await knex('users').where({ id }).first();

        if (!userFound) {
            return res.status(404).json({ message: "usuário não encontrado." })
        }

        const deletedUser = await knex('users').where({ id }).delete()

        if (deletedUser === 0) {
            return res.status(400).json({ message: "Não foi possível deletar o usuário." })
        }

        return res.status(200).json({ message: "Usuário deletado com sucesso." })


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser
}