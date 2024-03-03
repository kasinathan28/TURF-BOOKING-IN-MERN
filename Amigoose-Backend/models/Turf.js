const mongoose = require('mongoose');

const TurfSchema = new mongoose.Schema({
  turfname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  location  : {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  openingTime: {
    type: String, 
    required: true,
  },
  closingTime: {
    type: String, 
    required: true,
  },
  sportsItems: {
    type: [String], 
    default: [], 
  },
  rate:{
    type:String,
    required:true,
  }
 
});

const Turfs = mongoose.model('Turfs', TurfSchema);

module.exports = Turfs;
