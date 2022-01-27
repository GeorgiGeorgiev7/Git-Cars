module.exports = {
    async details(req, res) {
        const id = req.params.id;
        const car = await req.storage.getById(id);

        if (car) {
            res.render(
                'details.hbs',
                { car, title: `Cars - ${car.title}` }
            );
        } else {
            res.redirect('/404');
        }
    }
}