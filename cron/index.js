const removeOldToken = require('./removeOldTokens');
const removeOldPassword = require('./removeOldPassword');

const cronRunner = () => {
    removeOldToken.start();
    removeOldPassword.start();
}

module.exports = {
    cronRunner,
}