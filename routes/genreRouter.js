const express = require('express');
const router = express.Router();

const {
    isAuthenticated
} = require('../helpers/auth');

const {
    genreControllerListGet,
    genreControllerFormGet,
    genreControllerFormPost,
    genreControllerDetailGet,
    genreControllerDeleteGet,
    genreControllerDeletePost,
    genreControllerUpdateGet,
    genreControllerUpdatePost
} = require('../controllers/genreController');

router.get('/catalog/genres', isAuthenticated, genreControllerListGet);

//Form Genre GET
router.get('/catalog/newgenre', isAuthenticated, genreControllerFormGet);

//Form Genre POST
router.post('/catalog/newgenre', isAuthenticated, genreControllerFormPost);

//Genre Detail GET
router.get('/catalog/genre/:id', isAuthenticated, genreControllerDetailGet);

//Genre Delete Get
router.get('/catalog/genre/:id/delete', isAuthenticated, genreControllerDeleteGet);

//Genre Delete Post
router.post('/catalog/genre/:id/delete', isAuthenticated, genreControllerDeletePost);

//Genre Delete Form GET
router.get('/catalog/genre/:id/update', isAuthenticated, genreControllerUpdateGet);

//Genre Delete Form POST
router.post('/catalog/genre/:id/update', isAuthenticated, genreControllerUpdatePost);

module.exports = router;