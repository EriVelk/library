const catalogController = {};
const Book = require('../models/bookModel');
const Author = require('../models/authorModel');
const BookInstance = require('../models/bookinstanceModel');
const Genre = require('../models/genreModel');

catalogController.catalogControllerGet = async(req, res) => {

    const bookCount = await Book.countDocuments();
    const bookInstanceCount = await BookInstance.countDocuments();
    const bookInstanceCountAvailable = await BookInstance.countDocuments({ status: 'Available' });
    const authorCount = await Author.countDocuments();
    const genreCount = await Genre.countDocuments();

    res.render('catalog', {
        title: 'Catalog Library',
        bookCount,
        bookInstanceCount,
        bookInstanceCountAvailable,
        authorCount,
        genreCount
    });
}

module.exports = catalogController;