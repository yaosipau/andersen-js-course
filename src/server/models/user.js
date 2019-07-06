const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: [true, 'firstName field is required'],
  },
  lastname: {
    type: String,
    required: [true, 'lastName field is required'],
  },
  age: {
    type: Number,
    required: [true, 'Age field is required'],
  },
  mail: {
    type: String,
    required: [true, 'e-mail field is required'],
  },
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
