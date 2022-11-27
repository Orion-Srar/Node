const fs = require("fs/promises");
const path = require("path");

const pathToFile = path.join(process.cwd(), 'DataBase', 'users.json');

const reader = async () => {
    const buffer = await fs.readFile(pathToFile);
    return  JSON.parse(buffer.toString())
}

const writer = async (users) => {
    await fs.writeFile(pathToFile, JSON.stringify(users));

}

module.exports = {
    reader, writer
}