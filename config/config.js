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
    FORGOT_PASSWORD_ACTION_TOKEN_SECRET: process.env.CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET || 'FPAS',

    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || 'AC654bacf3f06a74760b8fba992de87c21',
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || 'fab4525f761afd1b94437a8140970d9f',
    TWILIO_SEND_SERVICE: process.env.TWILIO_SEND_SERVICE || 'MG740a4f56529b8335fabcf1771142c728',

    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || 'boikoandriipetrovich',
    S3_BUCKET_REGION: process.env.S3_BUCKET_REGION || 'us-east-1',
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECURITY_KEY: process.env.S3_SECURITY_KEY
}