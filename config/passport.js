const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/usersModel');

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async(email, password, done) => {

    //Match email's user.
    const user = await User.findOne({ email });
    if (!user) {
        return done(null, false, { message: 'Not email found' });
    } else {
        //Match Password User.
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password.' });
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});