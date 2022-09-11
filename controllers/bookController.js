const Book = require('../models/bookModel');
const Author = require('../models/authorModel');
const Genre = require('../models/genreModel');
const BookInstance = require('../models/bookinstanceModel');
const path = require('path');
const { body, validationResult } = require('express-validator');
const Resize = require('../config/resize');
const multer = require('multer');
const upload = require('../config/upload');

const bookController = {};

//List of All Books GET
bookController.bookControllerListGet = async(req, res, next) => {
    await Book.find({}, 'title author')
        .populate('author')
        .exec(function(err, list_books) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('books/indexBooks', { title: 'Book List', book_list: list_books });
        });
}

//Form Book GET
bookController.bookControllerFormGet = async(req, res) => {
    //Get all authors and genres, wich we can use for adding to our book.
    const authors = await Author.find();
    const genres = await Genre.find();

    res.render('books/formBooks', {
        title: 'Register Book',
        authors,
        genres
    });
}

//Form Book POST
bookController.bookControllerFormPost = [
    //Convert the genre to an array.
    (req, res, next) => {
        if (!(req.body.genre instanceof Array)) {
            if (typeof req.body.genre === 'undefined')
                req.body.genre = [];
            else
                req.body.genre = new Array(req.body.genre);
        }
        next();
    },

    //Validate and sanitize fields.
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('author', 'Author must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('isbn', 'ISBN must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('genre.*').escape(),

    upload.single('image'),

    async(req, res, next) => {
        //Extract the validation errors.
        const errors = validationResult(req);

        const imagePath = path.join(__dirname, '/public/images/library');

        const fileUpload = new Resize(imagePath);
        console.log(fileUpload)
        //const filename = await fileUpload.save(req.file.buffer);

        //console.log(filename);

        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            summary: req.body.summary,
            isbn: req.body.isbn,
            genre: req.body.genre
        });

        if (!errors.isEmpty()) {
            const authors = await Author.find();
            const genres = await Genre.find();

            for (let i = 0; i < genres.length; i++) {
                if (book.genre.indexOf(genres[i]._id) > -1) {
                    genres[i].checked = 'true';
                }
            }

            res.render('books/formBooks', {
                title: 'Register Book',
                authors,
                genres,
                errors: errors.array()
            });
        } else {
            console.log(book)
            book.save(function(err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/catalog/books');
            });
        }
    }
];

//Detail Book GET
bookController.bookControllerDetailGet = async(req, res, next) => {
    const book = await Book.findById(req.params.id).populate('author').populate('genre');
    console.log(book);
    const bookinstance = await BookInstance.find({ 'book': req.params.id });

    if (book == null) {
        let error = new Error('Book not found');
        error.status = 404;
        return next(error);
    }

    //Successful, so render.
    res.render('books/detailBooks', {
        title: book.title,
        book,
        bookinstance
    });
}

//Delete Book GET
bookController.bookControllerDeleteGet = async(req, res, next) => {
    const book = await Book.findById(req.params.id).populate('author').populate('genre');
    const book_bookinstances = await BookInstance.find({ 'book': req.params.id });

    if (book == null) {
        res.redirect('/catalog/books');
    }

    res.render('books/deleteBooks', {
        title: 'Delete Book',
        book,
        book_bookinstances
    });
}

//Delete Book POST
bookController.bookControllerDeletePost = async(req, res, next) => {
    const book = await Book.findById(req.body.id).populate('author').populate('genre');
    const book_bookinstances = await BookInstance.find({ 'book': req.body.id });

    if (book_bookinstances.length > 0) {
        res.render('books/deleteBooks', {
            title: 'Delete Book',
            book,
            book_bookinstances
        });
    } else {
        Book.findByIdAndRemove(req.body.id, function deleteBook(err) {
            if (err) {
                return next(err);
            }
            //Success
            res.redirect('/catalog/books');
        })
    }
}

//Update Form Book GET
bookController.bookControllerUpdateGet = async(req, res, next) => {
    const book = await Book.findById(req.params.id).populate('author').populate('genre');
    const authors = await Author.find();
    const genres = await Genre.find();

    if (book == null) {
        let err = new Error('Book not found');
        err.status = 404;
        return next(err);
    }

    //Mark our selected genres as checked
    for (let all_gener_i = 0; all_gener_i < genres.length; all_gener_i++) {
        for (let book_gener_i = 0; book_gener_i < book.genre.length; book_gener_i++) {
            if (genres[all_gener_i]._id.toString() === book.genre[book_gener_i]._id.toString()) {
                genres[all_gener_i].checked = 'true';
            }
        }
    }

    res.render('books/formBooks', {
        title: 'Update Book',
        authors,
        genres,
        book
    });
}

//Update Form Book POST
bookController.bookControllerUpdatePost = [

    //Convert the genre to an array.
    (req, res, next) => {
        if (!(req.body.genre instanceof Array)) {
            if (typeof req.body.genre === 'undefined') {
                req.body.genre = [];
            } else {
                req.body.genre = new Array(req.body.genre);
            }
        }
        next();
    },

    //Validate and sanitize fields.
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('author', 'Author must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('isbn', 'ISBN must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('genre.*', 'Select at least one genre').isLength({ min: 1 }).escape(),

    async(req, res, next) => {
        //extract the validation errors form a request.
        const errors = validationResult(req);

        //Create a Book object with escaped/trimmed data and old id
        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            summary: req.body.summary,
            isbn: req.body.isbn,
            genre: (typeof req.body.genre === 'undefined') ? [] : req.body.genre,
            _id: req.params.id
        });

        if (!errors.isEmpty()) {
            const authors = await Author.find();
            const genres = await Genre.find();

            for (let i = 0; i < genres.length; i++) {
                if (book.genre.indexOf(genres[i]._id) > -1) {
                    genres[i].checked = 'true';
                }
            }

            res.render('books/formBooks', {
                title: 'Update Book',
                authors,
                genres,
                book,
                errors: errors.array()
            });
            return;
        } else {
            // Data from form is valid. Update the record.
            Book.findByIdAndUpdate(req.params.id, book, {}, (err, thebook) => {
                if (err) {
                    return next(err);
                }
                //Successfull
                res.redirect(thebook.url);
            })
        }

    }

];

module.exports = bookController;