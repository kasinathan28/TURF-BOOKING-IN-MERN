const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  turfId:{
    type:String,
    required:true
  },
  paymentId:{
    type:String
  }
});

const Bookings = mongoose.model('Bookings', BookingSchema);

module.exports = Bookings;
