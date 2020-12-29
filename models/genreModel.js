const { Schema, model } = require('mongoose');

const GenreSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    }
});

//Virtual for Genre's URL
GenreSchema.virtual('url').get(function() {
    return '/catalog/genre/' + this._id;
});

module.exports = model('Genre', GenreSchema);