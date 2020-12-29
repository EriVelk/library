const express = require('express');
const router = express.Router();

//Importing controller
const {
    indexControllerGet
} = require('../controllers/indexControllers');


router.get('/', indexControllerGet);

module.exports = router;