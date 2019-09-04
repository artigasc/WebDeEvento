var mongoose = require('mongoose');

var HubSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: mongoose.Schema.Types.Array,
    exhibitor: mongoose.Schema.Types.Array,
    payment: mongoose.Schema.Types.Array,
    concept: mongoose.Schema.Types.Array,
    category: mongoose.Schema.Types.Array,
    theme: mongoose.Schema.Types.Array,
    sponsor: mongoose.Schema.Types.Array,
    hall: mongoose.Schema.Types.Array,
    plane: mongoose.Schema.Types.Array,
    language: mongoose.Schema.Types.Array,
    tematicssession: mongoose.Schema.Types.Array,
    new: mongoose.Schema.Types.Array,
    content: {} 
}, { collection: 'HUB' });


const hub = mongoose.model('HUB', HubSchema);
module.exports = hub;