module.exports = {
    PORT: process.env.PORT || 5000,
    DB_PASSWORD: process.env.DB_PASSWORD || '5685689',
    MONGO_URL: process.env.MONGO_URL || 'mongodb+srv://andrii:andrii@cluster0.b65lbvm.mongodb.net/?retryWrites=true&w=majority',

    ACCESS_SECRET: process.env.ACCESS_SECRET || 'secretWorld',
    REFRESH_SECRET: process.env.REFRESH_SECRET || 'secretRefreshWorld'
}