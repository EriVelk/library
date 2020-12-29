const express = require('express');
const router = express.Router();

//Importing controller
const {
    catalogControllerGet
} = require('../controllers/catalogController');

const {
    isAuthenticated
} = require('../helpers/auth');


router.get('/catalog', isAuthenticated, catalogControllerGet);


module.exports = router;