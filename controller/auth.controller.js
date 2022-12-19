const authService = require('../service/oauth.service');
const emailService = require('../service/mail.service');
const OAuth = require('../DataBase/OAuth');
const ActionToken = require('../DataBase/ActionToken');
const User = require('../DataBase/user');
const {WELCOME, FORGOT_PASS} = require("../config/email-ection.enum");
const {FORGOT_PASSWORD} = require("../config/token-action.enum");
const {FRONTEND_URL} = require("../config/config");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user, body} = req;

            await emailService.sendEmail('boykoandriy93@gmail.com', WELCOME, {userName: user.name}),

            await authService.comparePasswords(user.password, body.password);

            const tokenPair = authService.generateAccessTokenPair({id: user._id});

            await OAuth.create({...tokenPair, _user_id: user._id});

            res.json({
                user,
                ...tokenPair
            });
        } catch (e) {
            next();
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {refreshToken, _user_id} = req.tokenInfo

            await OAuth.deleteOne({refreshToken});

            const tokenPair = authService.generateAccessTokenPair({id: _user_id});

            await OAuth.create({...tokenPair, _user_id});

            res.status(201).json(tokenPair);
        } catch (e) {
            next();
        }
    },

    logout: async (req, res, next) => {
        try {
            const {accessToken} = req.tokenInfo

            await OAuth.deleteOne({accessToken});

            res.sendStatus(204);
        } catch (e) {

            next();
        }
    },

    logoutAll: async (req, res, next) => {
        try {
            const {_user_id} = req.tokenInfo

            await OAuth.deleteMany({_user_id});

            res.sendStatus(204);
        } catch (e) {

            next();
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const user = req.user;

            const actionToken = authService.generateActionToken(FORGOT_PASSWORD, {email: user.email});
            const forgotPassFEUrl = `${FRONTEND_URL}/password/new?token=${actionToken}`;

            await ActionToken.create({token: actionToken, _user_id: user._id, tokenType: FORGOT_PASSWORD});
            await emailService.sendEmail('boykoandriy93@gmail.com', FORGOT_PASS, {url: forgotPassFEUrl})

            res.json('ok');
        } catch (e) {
            next();
        }
    },

    setPasswordAfterForgot: async (req, res, next) => {
        try {

            console.log(req.user);

            const hashPassword = await authService.hashPassword(req.body.password);

            await ActionToken.deleteOne({token: req.get('Authorization')});
            await User.updateOne({_id: req.user._id}, {password: hashPassword});

            res.json('ok');
        } catch (e) {
            next();
        }
    },

}