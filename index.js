const express = require('express');
const hbs = require('express-handlebars');

const initDB = require('./models/index');

const { about } = require('./controllers/about');
const { details } = require('./controllers/details');
const { home } = require('./controllers/home');
const { notFound } = require('./controllers/notFound');
const create = require('./controllers/create');
const del = require('./controllers/delete');
const edit = require('./controllers/edit');
const accessory = require('./controllers/accessory');
const attach = require('./controllers/attach');

const carsService = require('./services/cars');
const accessoryService = require('./services/accessory');


start();

async function start() {
    await initDB();

    const port = 3000;
    const app = express();

    app.engine('.hbs', hbs.create({
        extname: '.hbs'
    }).engine);

    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));
    app.use(carsService());
    app.use(accessoryService());

    app.get('/', home);
    app.get('/about', about);

    app.route('/create')
        .get(create.get)
        .post(create.post);

    app.route('/delete/:id')
        .get(del.get)
        .post(del.post);

    app.route('/edit/:id')
        .get(edit.get)
        .post(edit.post);

    app.get('/details/:id', details);

    app.route('/accessory')
        .get(accessory.get)
        .post(accessory.post);

    app.route('/attach/:id')
        .get(attach.get)
        .post(attach.post);


    app.all('*', notFound);

    app.listen(port, () =>
        console.log(`>>> Server listening on port: ${port}`));
}
