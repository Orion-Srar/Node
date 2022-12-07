const ApiError = require('../error/apiError');
const {userService} = require("../service");
const User = require('../DataBase/user');
const {userNormalizator} = require("../helper");
const commonValidator = require('../validator/common.validators')
const userValidator = require('../validator/user.validator')

module.exports = {
    // checkIsUserExist: async (req, res, next) => {
    //     try {
    //         const {userId} = req.params;
    //
    //         const user = await userService.findById(userId);
    //
    //         if (!User) {
    //             throw new ApiError('User is not found', 404)
    //         }
    //
    //         req.user = user;
    //
    //         next();
    //
    //     } catch (e) {
    //         next(e);
    //     }
    // },

    checkIsUserDynamically: (fieldName, from = 'body', dbField = fieldName) => async (req, res, next) => {
        try {
            const fieldToSearch = req[from][fieldName];

            const user = await User.findOne({[dbField]: fieldToSearch});

            if (!User) {
                throw new ApiError('User is not found', 404)
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsEmailUnique: async (req, res, next) => {
        try {
            const {email} = req.body;

            if (!email) {
                throw new ApiError('Email is not present', 404);
            }

            const user = await userService.findOneByParams({email});

            if (user) {
                throw new ApiError(`User with this email is already exists`, 409)
            }

            next();

        } catch (e) {
            next(e);
        }
    },

    isBodyValidCreate: (req, res, next) => {
        try {
            const {name, age, email} = req.body;

            if (!name || name.length < 3 || typeof name !== 'string') {
                throw new ApiError('Wrong name', 400);
            }

            if (!age || age < 0 || Number.isNaN(+age)) {
                throw new ApiError('Wrong age', 400);
            }

            if (!email || !email.includes('@')) {
                throw new ApiError('Wrong email', 400);
            }

            next();

        } catch (e) {
            next(e);
        }
    },

    isBodyValidUpdate: (req, res, next) => {
        try {
            const {name, age} = req.body;

            if (name && (name.length < 3 || typeof name !== 'string')) {
                throw new ApiError('Wrong name', 400);
            }

            if (age && (age < 0 || Number.isNaN(+age))) {
                throw new ApiError('Wrong age', 400);
            }

            next();

        } catch (e) {
            next(e);
        }
    },

    isIdValid: (req, res, next) => {
        try {
            const {userId} = req.params;

            if (userId < 24) {
                throw new ApiError('Not valid ID', 400);
            }

            next();

        } catch (e) {
            next(e);
        }
    },

    userNormalizator: (req, res, next) => {
        try {
            let {name, email} = req.body;

            if (name) {
                req.body.name = userNormalizator.name(name);
            }
            if (email) {
                req.body.email = email.toLowerCase();
            }
            next()
        }catch (e) {
            next(e)
        }
    },

    isNewUserValid: async (req, res, next) => {
        try {

             const validate = userValidator.newUserValidator.validate(req.body);

             if (validate.error) {
                 throw new ApiError(validate.error.message, 400);
             }

            next()
        }catch (e) {
            next(e)
        }
    },

    isEditUserValid: async (req, res, next) => {
        try {

             const validate = userValidator.editUserValidator.validate(req.body);

             if (validate.error) {
                 throw new ApiError(validate.error.message, 400);
             }

            next()
        }catch (e) {
            next(e)
        }
    },

    isUserIdValid: async (req, res, next) => {
        try {

            const {userId} = req.body;

            const validate = commonValidator.idValidator.validate(userId);

            if(validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            next()
        }catch (e) {
            next(e)
        }
    }
}