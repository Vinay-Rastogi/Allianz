const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  carRegNum: String,
  name: String,
  company: String,
  visiting: String,
  date: String,
  timeIn: String
});

module.exports = mongoose.model('Visitor', visitorSchema);
