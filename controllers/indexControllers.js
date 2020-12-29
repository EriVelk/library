const indexController = {};


indexController.indexControllerGet = async(req, res) => {



    res.render('index', {
        title: 'Library with NodeJS, Express, Authenticate-Passport, MongoDB and Bootstrap 5'
    });
}

module.exports = indexController;