module.exports = {
    about(req, res) {
        res.render('about.hbs', { title: 'About us' });
    }
}