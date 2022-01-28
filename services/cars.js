// const fs = require('fs/promises');
const Car = require('../models/Car');


//const filepath = './services/data.json';
/*
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
        await fs.writeFile(filepath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Database write error');
        console.error(err);
        process.exit(1);
    }
}
*/

function carViewModel(car) {
    return {
        id: car._id,
        name: car.name,
        description: car.description,
        imageUrl: car.imageUrl,
        price: car.price
    };
}

async function getAll(query) {
    const options = {};

    if (query.search) {
        options.name = new RegExp(query.search, 'i');
    }

    if (query.from) {
        options.price = { $gte: Number(query.from) };
    }

    if (query.to) {
        if (!options.price) {
            options.price = {};
        }
        options.price = { $lte: Number(query.to) };
    }

    const cars = await Car.find(options);
    return cars.map(carViewModel);
    /*
    const data = await read();
    let cars = Object
        .entries(data)
        .map(([id, v]) => Object.assign({}, { id }, v));

    if (query.search) {
        cars = cars.filter(c => c.name.toLocaleLowerCase()
            .includes(query.search.toLocaleLowerCase()));
    }

    if (query.from) {
        cars = cars.filter(c => Number(c.price) >= Number(query.from));
    }

    if (query.to) {
        cars = cars.filter(c => Number(c.price) <= Number(query.to));
    }
    */
}

async function getById(id) {
    const car = await Car.findById(id);
    if (car) {
        return carViewModel(car);
    } else {
        return undefined;
    }
    /*
    const data = await read();
    const car = data[id];

    if (car) {
        return Object.assign({}, { id }, car);
    } else {
        return undefined;
    }
    */
}

async function createCar(car) {
    const result = new Car(car);
    await result.save();
    /*
    const cars = await read();
    let id = nextId();

    while (cars.hasOwnProperty(id)) {
        id = nextId();
    }

    cars[id] = car;

    await write(cars);
    */
}

async function deleteById(id) {
    await Car.findByIdAndDelete(id);
    /*
    const data = await read();

    if (data.hasOwnProperty(id)) {
        delete data[id];
        await write(data);
    } else {
        throw new Error('No such ID in database');
    }
    */
}

async function editById(id, car) {
    await Car.findByIdAndUpdate(id, car);
    /*
    const data = await read();

    if (data.hasOwnProperty(id)) {
        data[id] = car;
        await write(data);
    } else {
        throw new Error('No such ID in database');
    }
    */
}

/*
function nextId() {
    return 'xxxxxxxx-xxxx'.replace(/x/g, () =>
        (Math.random() * 16 | 0).toString(16));
}
*/

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
        createCar,
        deleteById,
        editById
    };
    next();
};
