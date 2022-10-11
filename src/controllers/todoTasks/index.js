const knex = require('../../connection');

const createTask = async (req, res) => {
    const { id } = req.user;
    const { description, date_finish } = req.body;

    if (!description || !date_finish) {
        return res.status(400).json({ message: "All fields need be filled" });
    }

    try {

        const user = await knex('users').where({ id }).first();

        if (!user) {
            return res.status(400).json({ message: "User not found." })
        }

        const task = await
            knex('tasks')
                .insert({
                    description,
                    date_finish,
                    user_id: id,
                    date_creation: new Date()
                });

        if (task.rowCount === 0) {
            return res.status(400).json({ message: "Could not create a task." });
        }

        return res.status(201).json()



    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getTask = async (req, res) => {

}

const getAllTasks = async (req, res) => {

}

const updateTask = async (req, res) => {

}

const deleteTask = async (req, res) => {

}

module.exports = {
    createTask,
    getTask,
    getAllTasks,
    updateTask,
    deleteTask
}