const express = require('express');
const session = require('express-session');
const path = require('path');
const flash = require('connect-flash');
const morgan = require('morgan');
const passport = require('passport');

//Initializations
const app = express();
require('./database');
require('./config/passport');

//Importing routes
const indexRoutes = require('./routes/indexRouter');
const userRoutes = require('./routes/userRouter');
const catalogRoutes = require('./routes/catalogRouter');
const authorRoutes = require('./routes/authorRouter');
const bookRoutes = require('./routes/bookRouter');
const genreRoutes = require('./routes/genreRouter');
const bookInstanceRoutes = require('./routes/bookInstanceRouter');

//Config
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    resave: true, // it does not save the session if it is not modified.
    saveUninitialized: true, // don't create a session until something is stored.
    secret: 'secret'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Variables
app.use((req, res, next) => {
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//Routes
app.use('/', indexRoutes);
app.use('/', userRoutes);
app.use('/', catalogRoutes);
app.use('/', authorRoutes);
app.use('/', bookRoutes);
app.use('/', genreRoutes);
app.use('/', bookInstanceRoutes);

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Start Server
app.listen(app.get('port'), () => {
    console.log('Server on port:', app.get('port'));
});