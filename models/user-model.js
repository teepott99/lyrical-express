const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


function capitalize(val) {
  if (typeof val !== 'string') val = '';
  return val.charAt(0).toUpperCase() + val.substring(1).toLowerCase();
};

const userSchema = new Schema({
  name: {
    type: String,
    set: capitalize,
    required: true,
  },
  lastName: {
    type: String,
    set: capitalize,
    required: true,
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;