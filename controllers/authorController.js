const Author = require('../models/authorModel');
const Book = require('../models/bookModel');
const { body, validationResult, check } = require('express-validator');

const authorController = {};

//List of All Authors GET
authorController.authorControllerListGet = async(req, res, next) => {
    await Author.find().sort([
        ['family_name', 'ascending']
    ]).exec(function(err, list_authors) {
        if (err) {
            return next(err);
        }

        //Successful, so render
        res.render('authors/indexAuthors', {
            title: 'Author List',
            author_list: list_authors
        })
    });
}

//Form Author GET
authorController.authorControllerFormGet = (req, res) => {
    res.render('authors/formAuthors', {
        title: 'Register Author'
    });
}

//Form Author POST
authorController.authorControllerFormPost = [
    //Validate and sanitize fields
    body('first_name', 'First Name must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('family_name').trim().isLength({ min: 1 }).escape().withMessage('Last Name must not be empty.'),
    body('date_of_birth', 'Date Of Birth must not be empty.').isLength({ min: 1 }),

    (req, res, next) => {
        //Extract errors from a request
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/errors messages.
            res.render('authors/formAuthors', {
                title: 'Register Author',
                author: req.body,
                errors: errors.array()
            });
        } else {
            //Data from form is valid.
            //Create an Author object
            const author = new Author({
                first_name: req.body.first_name,
                family_name: req.body.family_name,
                date_of_birth: req.body.date_of_birth,
                date_of_death: req.body.date_of_death
            });
            console.log(author)
            author.save(function(err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/catalog/authors');
            })
        }
    }

];

//Author Detail GET
authorController.authorControllerDetailGet = async(req, res, next) => {

    const author = await Author.findById(req.params.id);
    const author_books = await Book.find({ 'author': req.params.id }, 'title summary');

    if (author == null) {
        let error = new Error('Author not found');
        error.status = 404;
        return next(error);
    }

    res.render('authors/detailAuthors', {
        title: 'Author Detail',
        author,
        author_books
    });
}

//Delete Author GET
authorController.authorControllerDeleteGet = async(req, res) => {
    const author = await Author.findById(req.params.id);
    const author_books = await Book.find({ 'author': req.params.id });

    if (author == null) {
        res.redirect('/catalog/authors');
    }

    res.render('authors/deleteAuthors', {
        title: 'Delete Author',
        author,
        author_books
    });
}

//Delete author POST
authorController.authorControllerDeletePost = async(req, res) => {
    const author = await Author.findById(req.body.authorid);
    const author_books = await Book.find({ 'author': req.body.authorid });

    if (author_books > 0) {
        res.render('authors/deleteAuthors', {
            title: 'Delete Author',
            author,
            author_books
        });
        return;
    } else {
        Author.findByIdAndRemove(req.body.authorid, function deleteAuthor(err) {
            if (err) {
                return next(error);
            }
            //Success
            res.redirect('/catalog/authors');
        })
    }
}

//Update form GET
authorController.authorControllerUpdateGet = async(req, res, next) => {
    const author = await Author.findById(req.params.id);
    if (author == null) {
        let err = new Error('Author not found');
        err.status = 404;
        return next(err);
    }
    //Success
    res.render('authors/formAuthors', {
        title: 'Update Author',
        author
    });

}

//Update form POST
authorController.authorControllerUpdatePost = [
    //Validate and sanitize fields.
    body('first_name', 'First Name must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('family_name').trim().isLength({ min: 1 }).escape().withMessage('Last Name must not be empty.'),
    body('date_of_birth', 'Date Of Birth must not be empty.').isLength({ min: 1 }),

    async(req, res, next) => {
        //Extract the validation errors from a request.
        const errors = validationResult(req);

        //Create Author object with scaped and trimmed data(And de old id).
        const author = new Author({
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death,
            _id: req.params.id
        });

        if (!errors.isEmpty()) {
            //There are errors.
            res.render('authors/formAuthors', {
                title: 'Update Author',
                author,
                errors: errors.array()
            });
            return;
        } else {
            //Data from is valid.
            await Author.findByIdAndUpdate(req.params.id, author, {}, function(err, theauthor) {
                if (err) {
                    return next(err);
                }
                //Success
                res.redirect(theauthor.url);
            })
        }
    }

];
module.exports = authorController;