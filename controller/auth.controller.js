const authService = require('../service/oauth.service');
const emailService = require('../service/mail.service');
const OAuth = require('../DataBase/OAuth');
const {WELCOME} = require("../config/email-ection.enum");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user, body} = req;

            await emailService.sendEmail('boykoandriy93@gmail.com', WELCOME),


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
    }
}