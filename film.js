const mongoose = require('mongoose');

var filmSchema = mongoose.Schema({

    name: String,
    genre: String,
    pays: String,
    date: String,
    synopsis: String

});

var Film = mongoose.model('Film', filmSchema);

module.exports = Film;