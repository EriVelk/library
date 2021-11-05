const { Schema, model } = require('mongoose');
const { DateTime } = require('luxon');

const AuthorSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        maxlength: 100
    },
    family_name: {
        type: String,
        required: true,
        maxlength: 100
    },
    date_of_birth: {
        type: Date
    },
    date_of_death: {
        type: Date
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

//Virtual for author's full name
AuthorSchema.virtual('name').get(function() {
    return this.family_name + ', ' + this.first_name;
});

//Virtual for author's URL
AuthorSchema.virtual('url').get(function() {
    return '/catalog/author/' + this._id;
});

//Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(function() {
    let lifetime_string = '';
    if (this.date_of_birth) {
        lifetime_string = DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
    }
    lifetime_string += ' - ';
    if (this.date_of_death) {
        lifetime_string += DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
    }
    return lifetime_string;
});

//Virtual's for Forms HTML
AuthorSchema.virtual('date_author_birth_format').get(function() {
    return DateTime.fromJSDate(this.date_of_birth).toISODate();
});

AuthorSchema.virtual('date_author_death_format').get(function() {
    return DateTime.fromJSDate(this.date_of_death).toISODate();
});


//Export model
module.exports = model('Author', AuthorSchema);