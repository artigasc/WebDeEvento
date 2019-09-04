var mongoose = require('mongoose');

var ConfigSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    country: mongoose.Schema.Types.Array,
    departament: mongoose.Schema.Types.Array,
    province: mongoose.Schema.Types.Array,
    district: mongoose.Schema.Types.Array
}, { collection: 'CONFIG' });


const config = mongoose.model('CONFIG', ConfigSchema);
module.exports = config;