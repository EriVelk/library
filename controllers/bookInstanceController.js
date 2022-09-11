const BookInstance = require('../models/bookinstanceModel');
const Book = require('../models/bookModel');
const { body, validationResult } = require('express-validator');

const bookInstanceController = {};

//List of All Book Instances GET
bookInstanceController.bookInstanceControllerListGet = async(req, res, next) => {
    await BookInstance.find().populate('book').exec(function(err, list_bookinstances) {
        if (err) {
            return next(err);
        }
        //Successful, so render
        res.render('bookinstances/indexBookInstances', {
            title: 'Book Instance List',
            bookinstance_list: list_bookinstances
        });
    });
}

//Form BookInstances GET
bookInstanceController.bookInstanceControllerFormGet = async(req, res, next) => {
    const bookList = await Book.find({}, 'title').exec(function(err, books) {
        if (err) {
            return next(err);
        }
        res.render('bookinstances/formBookInstances', {
            title: 'Create Book Instance',
            books: books
        });
    });
}

//Form BookInstances POST
bookInstanceController.bookInstanceControllerFormPost = [
    //Validate and sanitize fields.
    body('book', 'Book must not be specified').trim().isLength({ min: 1 }).escape(),
    body('imprint', 'Imprint must not be specified.').trim().isLength({ min: 1 }).escape(),
    body('status', 'Status must not be specified.').trim().isLength({ min: 1 }).escape(),
    body('due_back', 'Due Back must not be specified.').trim().isLength({ min: 1 }).escape(),

    (req, res, next) => {
        //Extract the validation errors from a request.
        const errors = validationResult(req);

        //Create a Book Instance object with escaped and trimmed data.
        const bookinstance = BookInstance({
            book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back
        });

        if (!errors.isEmpty()) {
            Book.find({}, 'title').exec(function(err, books) {
                if (err) {
                    return next(err);
                }

                res.render('bookinstances/formBookInstances', {
                    title: 'Create Book Instance',
                    books: books,
                    selected_book: bookinstance.book._id,
                    errors: errors.array(),
                    bookinstance: bookinstance
                });
            });
            return;
        } else {
            //Data from form is valid.
            console.log(bookinstance)
            bookinstance.save(function(err) {
                if (err) {
                    return next(err);
                }
                //Successful - redirect to new record.
                res.redirect(bookinstance.url);
            });
        }
    }
]

//BookInstance Detail GET
bookInstanceController.bookInstanceControllerDetailGet = async(req, res, next) => {
    const bookinstance = await BookInstance.findById(req.params.id).populate('book');

    if (bookinstance == null) {
        let error = new Error('Book copy not found');
        error.status = 404;
        return next(error);
    }
    //Successful, so render.
    res.render('bookinstances/detailBookInstances', {
        title: 'Copy: ' + bookinstance.book.title,
        bookinstance
    });
}

//BookInstance Delete GET
bookInstanceController.bookInstanceControllerDeleteGet = async(req, res, next) => {
    const bookinstance = await BookInstance.findById(req.params.id).populate('book');

    if (bookinstance == null) {
        res.redirect('/catalog/bookinstances');
    }

    //Successful
    res.render('bookinstances/deleteBookInstances', {
        title: 'Delete BookInstance',
        bookinstance
    });
}

//BookInstance Delete POST
bookInstanceController.bookInstanceControllerDeletePost = async(req, res, next) => {

    BookInstance.findByIdAndRemove(req.body.id, function deleteBookInstance(err) {
        if (err) {
            return next(err);
        }
        //Success
        res.redirect('/catalog/bookinstances');
    })
}

//BookInstance Update GET
bookInstanceController.bookInstanceControllerUpdateGet = async(req, res, next) => {

    const bookinstance = await BookInstance.findById(req.params.id).populate('book');
    const books = await Book.find();

    if (bookinstance == null) {
        let err = new Error('Book copy not found');
        err.status = 404;
        return next(err);
    }
    //Successfull
    res.render('bookinstances/formBookInstances', {
        title: 'Update Book Instance',
        books,
        selected_book: bookinstance.book._id,
        bookinstance
    });
}

//Book Instance Update POST
bookInstanceController.bookInstanceControllerUpdatePost = [
    //Validate and sanitize fields.
    body('book', 'Book must not be specified').trim().isLength({ min: 1 }).escape(),
    body('imprint', 'Imprint must not be specified.').trim().isLength({ min: 1 }).escape(),
    body('status', 'Status must not be specified.').trim().isLength({ min: 1 }).escape(),
    body('due_back', 'Due Back must not be specified.').trim().isLength({ min: 1 }).escape(),

    async(req, res, next) => {
        //Extract the validation errors from a request.
        const errors = validationResult(req);

        //Create a Book Instance object with escaped/trimmed data and current id.
        const bookinstance = new BookInstance({
            book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back,
            _id: req.params.id
        });

        if (!errors.isEmpty()) {
            const books = await Book.find({}, 'title');
            if (books == null) {
                let err = new Error('Book copy not found');
                err.status = 404;
                return next(err);
            }
            res.render('bookinstances/formBookInstances', {
                title: 'Update Book Instance',
                books,
                selected_book: bookinstance.book._id,
                errors: errors.array(),
                bookinstance
            });
            return;
        } else {
            BookInstance.findByIdAndUpdate(req.params.id, bookinstance, {}, (err, thebookinstance) => {
                if (err) {
                    return next(err);
                }
                //Successfull
                res.redirect(thebookinstance.url);
            })
        }
    }
]

module.exports = bookInstanceController;