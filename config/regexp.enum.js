module.exports = {
    EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$!%_*#?&]{8,}$/,
    MONGO_ID: /^(?=[a-f\d]{24}$)(\d+[a-f]+\d)/
}