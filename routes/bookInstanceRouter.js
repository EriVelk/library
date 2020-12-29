const express = require('express');
const router = express.Router();

const {
    isAuthenticated
} = require('../helpers/auth');

//Importing controllers
const {
    bookInstanceControllerListGet,
    bookInstanceControllerFormGet,
    bookInstanceControllerFormPost,
    bookInstanceControllerDetailGet,
    bookInstanceControllerDeleteGet,
    bookInstanceControllerDeletePost,
    bookInstanceControllerUpdateGet,
    bookInstanceControllerUpdatePost
} = require('../controllers/bookInstanceController');

//List all bookinstances
router.get('/catalog/bookinstances', isAuthenticated, bookInstanceControllerListGet);

//Get BookInstances Form
router.get('/catalog/newbookinstance', isAuthenticated, bookInstanceControllerFormGet);

//Post BookInstances Form
router.post('/catalog/newbookinstance', isAuthenticated, bookInstanceControllerFormPost);

//Detail BookInstance GET
router.get('/catalog/bookinstance/:id', isAuthenticated, bookInstanceControllerDetailGet);

//Delete BookInstance GET
router.get('/catalog/bookinstance/:id/delete', isAuthenticated, bookInstanceControllerDeleteGet);

//Delete BookInstance POST
router.post('/catalog/bookinstance/:id/delete', isAuthenticated, bookInstanceControllerDeletePost);

//Update BookInstance GET
router.get('/catalog/bookinstance/:id/update', isAuthenticated, bookInstanceControllerUpdateGet);

//Update BookInstance POST
router.post('/catalog/bookinstance/:id/update', isAuthenticated, bookInstanceControllerUpdatePost);
module.exports = router;