const knex = require('../../connection');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json("All fields need be filled.")
    }

    try {

        const userAlreadyExists = await knex('users').where({ email }).first();

        if (userAlreadyExists) {
            return res.status(400).json({ message: "User already exists." });
        }

        const user = await knex('users').insert({ name, email, password: await bcrypt.hash(password, 10) }).returning(["id", "name", "email"]);

        if (!user) {
            return res.status(400).json({ message: "Could not create user." })
        }

        return res.status(200).json(user[0])

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const getUser = async (req, res) => {
    const { id } = req.user;

    try {

        const userFound = await knex.select(['id', 'name', 'email']).from('users').where({ id });

        if (!userFound) {
            return res.status(404).json({ message: "User not found." })
        }

        return res.status(200).json(userFound);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.user;
    const { name, password } = req.body;

    try {

        const userFound = await knex('users').where({ id }).first();

        if (!userFound) {
            return res.status(404).json({ message: "User not found." })
        }

        let newName = name || userFound.name;
        let newPassword = "";
        if (!password) {
            newPassword = userFound.password;
        } else {
            newPassword = await bcrypt.hash(password, 10);
        }

        const updatedUser = await knex('users').where({ id }).update({ name: newName, password: newPassword }).returning(['id', 'name', 'email']);

        if (!updatedUser) {
            return res.status(404).json({ message: "Could not update user.." })
        }

        return res.status(200).json(updatedUser);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.user;

    try {

        const userFound = await knex('users').where({ id }).first();

        if (!userFound) {
            return res.status(404).json({ message: "User not found." })
        }

        const deletedUser = await knex('users').where({ id }).delete()

        if (deletedUser === 0) {
            return res.status(400).json({ message: "Could not delete user.." })
        }

        return res.status(200).json({ message: "User successfully deleted." })


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