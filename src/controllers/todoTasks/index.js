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
    const { id } = req.user;
    const { id: id_task } = req.params;

    try {

        const user = await knex('users').where({ id }).first();

        if (!user) {
            return res.status(400).json({ message: "User not found." })
        }

        const task = await knex('tasks').where('id', id_task).where('user_id', id).first();

        if (!task) {
            return res.status(400).json({ message: "Task not found." })
        }

        return res.status(200).json(task)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getAllTasks = async (req, res) => {
    const { id } = req.user;

    try {

        const user = await knex('users').where({ id }).first();

        if (!user) {
            return res.status(400).json({ message: "User not found." })
        }

        const tasks = await knex('tasks').where('user_id', id);

        if (!tasks) {
            return res.status(400).json({ message: "Task not found." })
        }

        return res.status(200).json(tasks)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
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