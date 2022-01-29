const Accessory = require('../models/Accessory');
const { accessoryViewModel } = require('./util');


async function getAll() {
    const accessories = await Accessory.find({});
    return accessories.map(accessoryViewModel);
}

async function createAccessory(accessory) {
    await Accessory.create(accessory);
}

module.exports = () => (req, res, next) => {
    req.accessory = {
        getAll,
        createAccessory
    };
    next();
};