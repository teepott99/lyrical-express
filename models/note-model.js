const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const noteSchema = new Schema({
  dateCreated: { type : Date, default: Date.now },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'},
  text: {
    type: String,
    required: true,
    unique: true,
    maxlength: 1000,
  },
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  
const Note = mongoose.model('Note', noteSchema);
  
module.exports = Note;