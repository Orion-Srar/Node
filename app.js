const express =require('express');
const path =require('path');

const app = express();

app.get('/users', (req, res) => {
    console.log('Hello')
    res.json('its ok')
})

app.listen(5000, () => {
    console.log('Server listen 5000');
})