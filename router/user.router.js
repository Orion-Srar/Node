const router = require('express').Router();

const controller = require('../controller/user.controller');
const middleware = require('../middleware/user.middleware');

router.get('/', controller.getAllUsers);
router.post('/', middleware.isBodyValidCreate, middleware.userNormalizator, middleware.isNewUserValid, middleware.checkIsEmailUnique, controller.createUser);

router.get(
    '/:userId',
    middleware.isUserIdValid,
    middleware.isIdValid,
    middleware.checkIsUserDynamically('userId', 'params', '_id'),
    controller.getUserById
);
router.put(
    '/:userId',
    middleware.isUserIdValid,
    middleware.isEditUserValid,
    middleware.isIdValid,
    middleware.userNormalizator,
    middleware.isBodyValidUpdate,
    middleware.checkIsUserDynamically('userId', 'params', '_id'),
    controller.updateUserById
);
router.delete(
    '/:userId',
    middleware.isUserIdValid,
    middleware.isIdValid,
    middleware.checkIsUserDynamically('userId', 'params', '_id'),
    controller.deleteUserById
);

module.exports = router;
