const authService = require('../service/oauth.service');
const OAuth = require('../DataBase/OAuth');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user, body} = req;

            await authService.comparePasswords(user.password, body.password);

            const tokenPair = authService.generateAccessTokenPair({id: user._id});

            await OAuth.create({...tokenPair,_user_id: user._id});

            res.json({
                user,
                ...tokenPair
            });
        } catch (e) {
            next();
        }
    }
}