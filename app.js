const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/users', async (req, res) => {
    const buffer = await fs.readFile(path.join(__dirname, 'DataBase', 'users.json'));
    const users = JSON.parse(buffer.toString())

    res.json(users);
})

app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params;

    const buffer = await fs.readFile(path.join(__dirname, 'DataBase', 'users.json'));
    const users = JSON.parse(buffer.toString());

    const user = users.find((user) => user.id === +userId);

    if (!user) {
        return res.status(404).json('User is not found');
    }

    res.json(user)
})

app.post('/users', async (req, res) => {
    const userInfo = req.body;

    const buffer = await fs.readFile(path.join(__dirname, 'DataBase', 'users.json'));
    const users = JSON.parse(buffer.toString());

    users.push({
        id: users[users.length - 1].id + 1,
        name: userInfo.name,
        age: userInfo.age
    });

    await fs.writeFile(path.join(__dirname, 'DataBase', 'users.json'), JSON.stringify(users));

    res.json('Created')
})

app.put('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    const userInfo = req.body;

    const buffer = await fs.readFile(path.join(__dirname, 'DataBase', 'users.json'));
    const users = JSON.parse(buffer.toString());

    const index = users.findIndex((user) => user.id === +userId);

    if (index === -1) {
        return res.status(404).json('User is not found');
    }

    users[index] = {...users[userId], ...userInfo};

    await fs.writeFile(path.join(__dirname, 'DataBase', 'users.json'), JSON.stringify(users));

    res.json('Updated')

})

app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params;

    const buffer = await fs.readFile(path.join(__dirname, 'DataBase', 'users.json'));
    const users = JSON.parse(buffer.toString());

    const index = users.findIndex((user) => user.id === +userId);

    if (index === -1) {
        return res.status(404).json('User is not found');
    }

    users.splice(index, 1);

    await fs.writeFile(path.join(__dirname, 'DataBase', 'users.json'), JSON.stringify(users));

    res.json('Updated')

})


app.listen(5000, () => {
    console.log('Server listen 5000');
})