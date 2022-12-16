const router = require('express').Router();

const controller = require('../controller/auth.controller');
const middleware = require('../middleware/auth.middleware');
const userMiddleware = require('../middleware/user.middleware');
const authMiddleware = require("../middleware/auth.middleware");

router.post('/login',middleware.isBodyValid,userMiddleware.checkIsUserDynamically('email'), controller.login);

router.post('/refresh',authMiddleware.checkRefreshToken, controller.refresh);

router.post('/logout', authMiddleware.checkAccessToken, controller.logout);

router.post('/logoutAll', authMiddleware.checkAccessToken, controller.logoutAll);

router.post('/password/forgot',userMiddleware.checkIsUserDynamically('email') , controller.forgotPassword);

router.put('/password/forgot',authMiddleware.checkActionToken, controller.setPasswordAfterForgot);

module.exports = router;