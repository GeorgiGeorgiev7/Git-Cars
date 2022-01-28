const express = require('express');
const hbs = require('express-handlebars');

const initDB = require('./models/index');

const { about } = require('./controllers/about');
const create = require('./controllers/create');
const { details } = require('./controllers/details');
const { home } = require('./controllers/home');
const { notFound } = require('./controllers/notFound');
const del = require('./controllers/delete');
const edit = require('./controllers/edit');

const carsService = require('./services/cars');


start()

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

    app.all('*', notFound);

    app.listen(port, () =>
        console.log(`Server listening on port: ${port} ...`));
}
