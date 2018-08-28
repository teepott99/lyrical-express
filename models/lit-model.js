const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const litSchema = new Schema({
  dateCreated: { type : Date, default: Date.now },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'},
  title: {
    type: String,
    required: true,
    unique: true,
    maxlength: 40,
  },
  author: {
    type: String,
    required: true,
    maxlength: 30,
  },
  type: { type: String, required: true },
  text: { 
    type: String, 
    required: true,
    maxlength: 3000,
   },
  notes: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Note'
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Literature = mongoose.model('Literature', litSchema);

module.exports = Literature;