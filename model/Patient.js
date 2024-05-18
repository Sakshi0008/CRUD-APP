const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name : String,
    age : Number,
    gender:String,
    diagnosis : String,
    entryDate : String,
});


module.exports = mongoose.model('Patient',patientSchema);