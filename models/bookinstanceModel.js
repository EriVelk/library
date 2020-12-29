const { Schema, model } = require('mongoose');
const { DateTime } = require('luxon');

const BookInstanceSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book', //reference to the associated book
        required: true
    },
    imprint: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: [
            'Available',
            'Maintenance',
            'Loaned',
            'Reserved'
        ],
        default: 'Maintenance'
    },
    due_back: {
        type: Date,
        default: Date.now()
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

//Virtual for bookinstance's URL
BookInstanceSchema.virtual('url').get(function() {
    return '/catalog/bookinstance/' + this._id;
});

//Virtual for BookInstance's format date
BookInstanceSchema.virtual('due_back_formatted').get(function() {
    return DateTime.fromJSDate(this.due_back).toISODate();
});

module.exports = model('BookInstance', BookInstanceSchema);