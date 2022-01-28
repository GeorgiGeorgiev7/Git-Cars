// [x] init Express app
// [x] init templating lib
// [x] create home controller 
// [x] bind routing
// [x] create layout
// create data service
// - [x] read all
// - [x] read by id
// - [x] create
// - [ ] edit
// - [x] delete
// - [x] search
// implement controller
// - [x] home
// - [x] about
// - [x] details
// - [x] create
// - [x] search
// - [ ] edit
// - [x] delete
// [x] add front-end code

const express = require('express');
const hbs = require('express-handlebars');

const { about } = require('./controllers/about');
const create = require('./controllers/create');
const { details } = require('./controllers/details');
const { home } = require('./controllers/home');
const { notFound } = require('./controllers/notFound');
const del = require('./controllers/delete');

const carsService = require('./services/cars');


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

app.get('/details/:id', details);


app.all('*', notFound);

app.listen(port, () =>
    console.log(`Server listening on port: ${port} ...`));
