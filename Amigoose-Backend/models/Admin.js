
const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  secretKey:{
    type:String,
    required:true,
  }
})


const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;

