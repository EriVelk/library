const express = require('express');
const router = express.Router();

const {
    isAuthenticated
} = require('../helpers/auth');

//Importing controllers
const {
    authorControllerListGet,
    authorControllerFormGet,
    authorControllerFormPost,
    authorControllerDetailGet,
    authorControllerDeleteGet,
    authorControllerDeletePost,
    authorControllerUpdateGet,
    authorControllerUpdatePost
} = require('../controllers/authorController');

//List All of Author
router.get('/catalog/authors', isAuthenticated, authorControllerListGet);

//Get Author Form
router.get('/catalog/newauthor', isAuthenticated, authorControllerFormGet);

router.post('/catalog/newauthor', isAuthenticated, authorControllerFormPost);

//Get Author Detail
router.get('/catalog/author/:id', isAuthenticated, authorControllerDetailGet);

//Get Author Delete
router.get('/catalog/author/:id/delete', isAuthenticated, authorControllerDeleteGet);

//Post Author Delete
router.post('/catalog/author/:id/delete', isAuthenticated, authorControllerDeletePost);

//Get Author Update
router.get('/catalog/author/:id/update', isAuthenticated, authorControllerUpdateGet);

//Post Author Update
router.post('/catalog/author/:id/update', isAuthenticated, authorControllerUpdatePost);

module.exports = router;