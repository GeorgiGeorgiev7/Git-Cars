const fs = require('fs/promises');


const filepath = './services/data.json';

async function read() {
    try {
        const file = await fs.readFile(filepath);
        return JSON.parse(file);
    } catch (err) {
        console.error('Database read error');
        console.error(err);
        process.exit(1);
    }
}

async function write(data) {
    try {
        await fs.writeFile(filepath, JSON.stringify(data));
    } catch (err) {
        console.error('Database write error');
        console.error(err);
        process.exit(1);
    }
}

async function getAll() {
    const data = await read();
    return Object
        .entries(data)
        .map(([id, v]) => Object.assign({}, { id }, v));
}

async function getById(id) {
    const data = await read();
    const car = data[id];

    if (car) {
        return Object.assign({}, { id }, car);
    } else {
        return undefined;
    }
}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById
    };
    next();
};
