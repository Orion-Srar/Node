const authValidator = require('../validator/auth.validator');
const authService = require('../service/oauth.service');
const OAuth = require('../DataBase/OAuth');
const ActionToken = require('../DataBase/ActionToken');

const ApiError = require("../error/apiError");
const {tokenTypeEnum} = require("../enum");
const {FORGOT_PASSWORD} = require("../config/token-action.enum");

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

            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.get('Authorization');

            if (!refreshToken) {
                throw new ApiError('No token', 401);
            }

            authService.checkToken(refreshToken, tokenTypeEnum.refreshToken);

            const tokenInfo = await OAuth.findOne({refreshToken});

            if(!tokenInfo){
                throw new ApiError('Token is not valid', 401)
            }

            req.tokenInfo = tokenInfo;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkActionToken: async (req, res, next) => {
        try {
            const actionToken = req.get('Authorization');

            if (!actionToken) {
                throw new ApiError('No token', 401);
            }

            authService.checkActionToken(actionToken, FORGOT_PASSWORD);

            const tokenInfo = await ActionToken
                .findOne({token: actionToken, tokenType: FORGOT_PASSWORD})
                .populate('_user_id');


            if(!tokenInfo){
                throw new ApiError('Token is not valid', 401)
            }

            req.user = tokenInfo._user_id;

            next();
        } catch (e) {
            next(e);
        }
    },

}