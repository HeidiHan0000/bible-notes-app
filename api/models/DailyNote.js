const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DailyNoteSchema = new Schema({
  bodyText : {
    type: String,
    required: true
  }, 
  timestamp: {
    type: String, 
    default: Date.now()
  }, 
  prayers: {
    type: Array, 
    required: false
  }, 
  category: {
    type: String,
    enum: ['Sermon', 'Small Group', 'QT'],
    default: 'Sermon'
  }, 
  date:{
    type: Date,
    default: Date.now()
  }
});


const DailyNote = mongoose.model("DailyNote", DailyNoteSchema);
module.exports = DailyNote;