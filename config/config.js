module.exports = {
    PORT: process.env.PORT || 5000,
    DB_PASSWORD: process.env.DB_PASSWORD || '5685689',
    MONGO_URL: process.env.MONGO_URL || 'mongodb+srv://andrii:andrii@cluster0.b65lbvm.mongodb.net/?retryWrites=true&w=majority',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://google.com',

    ACCESS_SECRET: process.env.ACCESS_SECRET || 'secretWorld',
    REFRESH_SECRET: process.env.REFRESH_SECRET || 'secretRefreshWorld',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'boykoandriy93@gmail.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || 'gqjeadxyjgmqtxuf',

    CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET: process.env.CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET || 'CAATS',
    FORGOT_PASSWORD_ACTION_TOKEN_SECRET: process.env.CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET || 'FPAS'
}