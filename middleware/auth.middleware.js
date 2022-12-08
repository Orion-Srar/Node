const authValidator = require('../validator/auth.validator');
const authService = require('../service/oauth.service');
const OAuth = require('../DataBase/OAuth');

const ApiError = require("../error/apiError");

module.exports = {
    isBodyValid: async (req, res, next) => {
        try {
            const validate = authValidator.loginValidator.validate(req.body);

            if (!validate) {
                throw new ApiError(validate.error.message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const accessToken = req.get('Authorization');
 

            if (!accessToken) {
                throw new ApiError('No token', 401);
            }

            authService.checkToken(accessToken);

            const tokenInfo = await OAuth.findOne({accessToken});

            if(!tokenInfo){
                throw new ApiError('Token is not valid', 401)
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}