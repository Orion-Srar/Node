const {fileServices} = require("../service");

module.exports = {

    getAllUsers: async (req, res, next) => {
        try {

            const users = await fileServices.reader();

            res.json(users);
        } catch (e) {
            next(e);
        }

    },

    getUserById: async (req, res, next) => {
        try {

            res.json(req.user)

        } catch (e) {
            next(e);
        }

    },

    createUser: async (req, res, next) => {
        try {
            const userInfo = req.body;

            const users = await fileServices.reader();

            users.push({
                id: users[users.length - 1].id + 1,
                name: userInfo.name,
                age: userInfo.age
            });

            await fileServices.writer(users);

            res.status(201).json('Created');
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const newUserInfo = req.body;
            const {user, users} = req;

            const index = users.findIndex((u) => u.id === user.id);

            users[index] = {...users[index], ...newUserInfo};

            await fileServices.writer(users);

            res.json('Updated')
        } catch (e) {
            next(e);
        }


    },

    deleteUserById: async (req, res, next) => {
        try {
            const {user, users} = req;

            const index = users.findIndex((u) => u.id === user.id);

            users.splice(index, 1);

            await fileServices.writer(users);

            res.sendStatus(204);

        } catch (e) {
            next(e)
        }
    }
}