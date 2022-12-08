const router = require('express').Router();

const controller = require('../controller/user.controller');
const middleware = require('../middleware/user.middleware');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', controller.getAllUsers);
router.post('/', middleware.isBodyValidCreate, middleware.userNormalizator, middleware.isNewUserValid, middleware.checkIsEmailUnique, controller.createUser);

router.get(
    '/:userId',
    middleware.isUserIdValid,
    authMiddleware.checkAccessToken,
    middleware.checkIsUserDynamically('userId', 'params', '_id'),
    controller.getUserById
);
router.put(
    '/:userId',
    middleware.isUserIdValid,
    middleware.isEditUserValid,
    middleware.userNormalizator,
    middleware.isBodyValidUpdate,
    authMiddleware.checkAccessToken,
    middleware.checkIsUserDynamically('userId', 'params', '_id'),
    controller.updateUserById
);
router.delete(
    '/:userId',
    middleware.isUserIdValid,
    authMiddleware.checkAccessToken,
    middleware.checkIsUserDynamically('userId', 'params', '_id'),
    controller.deleteUserById
);

module.exports = router;
