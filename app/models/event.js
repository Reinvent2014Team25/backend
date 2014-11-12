var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DataSchema   = new Schema({
    name: String,
    time: String,
    date: String
});

module.exports = mongoose.model('Events', DataSchema);
