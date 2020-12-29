const Genre = require('../models/genreModel');
const Book = require('../models/bookModel');
const { body, validationResult } = require('express-validator');
const bookModel = require('../models/bookModel');

const genreController = {};

//List of All Genres
genreController.genreControllerListGet = async(req, res, next) => {
    await Genre.find().sort([
        ['name', 'ascending']
    ]).exec(function(err, list_genres) {
        if (err) {
            return next(err);
        }
        //Successfull, so render
        res.render('genres/indexGenres', {
            title: 'Genre List',
            genre_list: list_genres
        });
    });
}

//Form Register Genre GET
genreController.genreControllerFormGet = (req, res) => {
    res.render('genres/formGenres', {
        title: 'Register Genre'
    });
}

//Form Register Genre POST
genreController.genreControllerFormPost = [
    body('name', 'Genre name required.').trim().isLength({ min: 1 }).escape(),

    //Proccess request after validation and sanitization.
    async(req, res, next) => {
        //Extract the validation errors from a request.
        const errors = validationResult(req);

        //Create a genre object with escaped and trimmed data.
        const genre = new Genre({
            name: req.body.name
        });

        if (!errors.isEmpty()) {
            //There are errors. Render the form again.
            res.render('genres/formGenres', {
                title: 'Register Genre',
                genre,
                errors: errors.array()
            });
        } else {
            await Genre.findOne({
                'name': req.body.name
            }).exec(function(err, found) {
                if (err) {
                    return next(err);
                }
                if (found) {
                    //Genre exists, redirect to its detail page.
                    res.redirect(found.url);
                } else {
                    genre.save();

                    res.redirect(genre.url);
                }
            })
        }
    }
]

//Genre Detail GET
genreController.genreControllerDetailGet = async(req, res, next) => {
    const genre = await Genre.findById(req.params.id);
    const genre_books = await Book.find({ 'genre': req.params.id });

    if (genre == null) {
        let error = new Error('Genre not found');
        error.status = 404;
        return next(error);
    }

    res.render('genres/detailGenres', {
        title: 'Genre Detail',
        genre,
        genre_books
    });
}

//Genre Delete GET
genreController.genreControllerDeleteGet = async(req, res, next) => {
    const genre = await Genre.findById(req.params.id);
    const genre_books = await Book.find({ 'genre': req.params.id });

    if (genre == null) {
        res.redirect('/catalog/genres');
    }

    //Successful
    res.render('genres/deleteGenres', {
        title: 'Delete Genre',
        genre,
        genre_books
    });
}

//Genre Delete POST
genreController.genreControllerDeletePost = async(req, res, next) => {
    const genre = await Genre.findById(req.body.id);
    const genre_books = await Book.find({ 'genre': req.body.id });

    if (genre_books.length > 0) {
        res.render('genres/deleteGenres', {
            title: 'Delete Genre',
            genre,
            genre_books
        });
    } else {
        Genre.findByIdAndRemove(req.body.id, function deleteGenre(err) {
            if (err) {
                return next(err);
            }
            //Success
            res.redirect('/catalog/genres');
        });
    }
}

//Update Form Genre GET
genreController.genreControllerUpdateGet = async(req, res, next) => {
    const genre = await Genre.findById(req.params.id);

    if (genre == null) {
        let err = new Error('Genre not found');
        err.status = 404;
        return next(err);
    }

    res.render('genres/formGenres', {
        title: 'Update Genre',
        genre
    })
}

//Update Form Genre POST
genreController.genreControllerUpdatePost = [
    //Validate and sanitize the name field.
    body('name', 'Genre name must contain at least 3 characters.').trim().isLength({ min: 3 }).escape(),

    //
    (req, res, next) => {
        const errors = validationResult(req);

        const genre = new Genre({
            name: req.body.name,
            _id: req.params.id
        });

        if (!errors.isEmpty()) {
            //Tehere are errors
            res.render('genres/formGenres', {
                title: 'Update Genre',
                genre,
                errors: errors.array()
            });
            return;
        } else {
            //Data from form is valid. Update the record.
            Genre.findByIdAndUpdate(req.params.id, genre, {}, (err, thegenre) => {
                if (err) {
                    return next(err);
                }
                //Successfull
                res.redirect(thegenre.url);
            });
        }
    }
];

module.exports = genreController;