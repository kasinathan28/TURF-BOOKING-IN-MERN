const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    
    minlength: 6,
  },
  avatar: {
    type: String, 
  },
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
