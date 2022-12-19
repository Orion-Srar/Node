const express = require('express');
const mongoose = require("mongoose");

const configs = require('./config/config')
const userRouter = require('./router/user.router');
const authRouter = require('./router/auth.router');
const {cronRunner} = require("./cron");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/users', userRouter);


app.use((err, req, res, next) => {

    res.status(err.status || 500).json({
        message: err.message || 'error',
        status: err.status || 500
    });

});


app.listen(configs.PORT,   async () => {
    try {
        await mongoose.connect(configs.MONGO_URL);
        console.log('Connect');
        console.log(`Server listen ${configs.PORT}`);
        cronRunner();
    }catch (e) {
        console.log(e)
    }

})