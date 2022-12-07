const {userService} = require("../service");
const {userNormalizator} = require("../helper");
const oauthService = require("../service/oauth.service");

module.exports = {

    getAllUsers: async (req, res, next) => {
        try {

            const users = await userService.findByParams();

            res.json(users);
        } catch (e) {
            next(e);
        }

    },

    createUser: async (req, res, next) => {
        try {
            const hashPassword = await oauthService.hashPassword(req.body.password);

            const userInfo = {...req.body, password: hashPassword};

            await userService.create(userInfo);

            res.status(201).json(userInfo);
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

    updateUserById: async (req, res, next) => {
        try {
            const newUserInfo = req.body;
            const {userId} = req.params;

            const user = await userService.updateOne(userId, newUserInfo);

            res.status(201).json(user)
        } catch (e) {
            next(e);
        }


    },

    deleteUserById: async (req, res, next) => {
        try {

            const {userId} = req.params;

            await userService.delete(userId);

            res.sendStatus(204);

        } catch (e) {
            next(e)
        }
    },

}