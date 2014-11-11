var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DataSchema   = new Schema({
    name: String,
    event: String,
    email: String,
    optin: Boolean,
    amount: String
});

module.exports = mongoose.model('Data', DataSchema);
