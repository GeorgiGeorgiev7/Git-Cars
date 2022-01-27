// [x] init Express app
// [x] init templating lib
// [x] create home controller 
// [x] bind routing
// [x] create layout
// [x] create data service
// [ ] implement controller

const express = require('express');
const hbs = require('express-handlebars');

const { about } = require('./controllers/about');
const { create } = require('./controllers/create');
const { details } = require('./controllers/details');
const { home } = require('./controllers/home');
const { notFound } = require('./controllers/notFound');

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
app.get('/create', create);
app.get('/details/:id', details);

app.all('*', notFound);

app.listen(port, () =>
    console.log(`Server listening on port: ${port} ...`));
