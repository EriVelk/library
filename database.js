const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dev_db_url = 'mongodb://localhost/library';

mongoose.connect(process.env.MONGODB_URI || dev_db_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(db => console.log('Database is connect'))
    .catch(err => console.log('ERROR::::::[ ', err));