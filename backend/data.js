const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// data base's data structure
const  DataSchema = new Schema(
    {
        id: Number,
        msg: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Data', DataSchema);