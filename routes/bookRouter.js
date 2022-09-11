const express = require('express');
const router = express.Router();

const {
    isAuthenticated
} = require('../helpers/auth');



//Importing controllers
const {
    bookControllerListGet,
    bookControllerFormGet,
    bookControllerFormPost,
    bookControllerDetailGet,
    bookControllerDeleteGet,
    bookControllerDeletePost,
    bookControllerUpdateGet,
    bookControllerUpdatePost
} = require('../controllers/bookController');

//List All Books GET
router.get('/catalog/books', isAuthenticated, bookControllerListGet);

//Form Register Book GET
router.get('/catalog/newbook', isAuthenticated, bookControllerFormGet);

//Form Register Book POST
router.post('/catalog/newbook', isAuthenticated, bookControllerFormPost);

//Book Detail GET
router.get('/catalog/book/:id', isAuthenticated, bookControllerDetailGet);

//Book Delete GET
router.get('/catalog/book/:id/delete', isAuthenticated, bookControllerDeleteGet);

//Book Delete POST
router.post('/catalog/book/:id/delete', isAuthenticated, bookControllerDeletePost);

//Book Update Form GET
router.get('/catalog/book/:id/update', isAuthenticated, bookControllerUpdateGet);

//Book Update Form POST
router.post('/catalog/book/:id/update', isAuthenticated, bookControllerUpdatePost);

module.exports = router;