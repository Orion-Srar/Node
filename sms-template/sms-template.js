const {smsTypeEnum} = require("../enum");

module.exports = {
    [smsTypeEnum.WELCOME]: (name) => {
        `Hello ${name}, welcome on our platform!`
    },

    [smsTypeEnum.FORGOT_PASS]: (name) => {
        `Hello ${name}, check email`
    },

}