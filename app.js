const express = require('express');
require('dotenv').config();

const userRouter = require('./router/user.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);

app.use((err, req, res, next) => {

    res.status(err.status || 500).json({
        message: err.message || 'error',
        status: err.status || 500
    });

});


app.listen(process.env.PORT, () => {
    console.log(`Server listen ${process.env.PORT}`);
})