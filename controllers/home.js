module.exports = {
    async home(req, res) {
        const cars = await req.storage.getAll(req.query);
        res.render('index.hbs',
            {
                cars,
                title: 'Best Cars',
                query: req.query
            }
        );
    }
};
