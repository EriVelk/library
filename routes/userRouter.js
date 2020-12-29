const express = require('express');
const router = express.Router();

const {
    isAuthenticated
} = require('../helpers/auth');

const {
    userControllerLogInGet,
    userControllerLogInPost,
    userControllerRegisterGet,
    userControllerRegisterPost,
    userControllerLogOutGet
} = require('../controllers/userControllers');

//Register
router.get('/register', userControllerRegisterGet);

router.post('/register', userControllerRegisterPost);

//Log In
router.get('/login', userControllerLogInGet);

router.post('/login', userControllerLogInPost);

//Log Out
router.get('/logout', isAuthenticated, userControllerLogOutGet);

module.exports = router;