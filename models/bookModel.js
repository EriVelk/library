const { Schema, model } = require('mongoose');

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    genre: [{
        type: Schema.Types.ObjectId,
        ref: 'Genre'
    }]
});

//Virtual for book's URL
BookSchema.virtual('url').get(function() {
    return '/catalog/book/' + this._id;
});

module.exports = model('Book', BookSchema);