const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    required: false
  }
});

module.exports = mongoose.model('task', taskSchema);