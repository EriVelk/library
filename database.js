const mongoose = require('mongoose');

const dev_db_url = 'mongodb+srv://veliz:QfiSt0ipsWC652Rv@cluster0.wa0k1.mongodb.net/library?retryWrites=true&w=majority';

mongoose.connect(process.env.MONGODB_URI || dev_db_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(db => console.log('Database is connect'))
    .catch(err => console.log('ERROR:[ ', err));