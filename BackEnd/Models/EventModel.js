var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId
}, { collection: 'EVENT', strict: false });

const Event = mongoose.model('EVENT', EventSchema);
module.exports = Event; 