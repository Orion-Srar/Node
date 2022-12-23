const {userService} = require("../service");
const User = require('../DataBase/user');
const s3Service = require('../service/s3.service');


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
            await User.createWithHashPassword(req.body);
            res.status(201).json('Ok');
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {

            // await emailService.sendEmail('boykoandriy93@gmail.com', FORGOT_PASS)

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

    uploadAvatar: async (req, res, next) => {
        try {
            const updateData = await s3Service.uploadPublicFile(req.files.avatar, 'user', req.user._id);

            const updateUser = await User.findByIdAndUpdate(req.user._id, {avatar: updateData.Location}, {new: true});

            res.status(201).json(updateUser);
        } catch (e) {
            next(`this is wrong ${e}`)
        }
    },

}