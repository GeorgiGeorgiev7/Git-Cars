module.exports = {
    create(req, res) {
        res.render('create.hbs', { title: 'Post Your Car' });
    }
}