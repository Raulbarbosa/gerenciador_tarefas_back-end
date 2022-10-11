const createUser = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json("Todos os campos devem ser preenchidos.")
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