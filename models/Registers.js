const mongoose = require('mongoose')
const RegisterSchema = new mongoose.Schema({

 firstName: {
  type: String,
  required: true
 },
lastName: {
  type: String,
  required: true
 },
 email: {
  type: String,
  required:true,
  unique: true
 },

 password: {
    type: String,
    required:true
},
confirmpassword: {
    type: String,
    required:true
},
 createdAt: {
  type: Date,
  default:Date.now
 }
})

const Register = mongoose.model('Register', RegisterSchema)

module.exports = Register;