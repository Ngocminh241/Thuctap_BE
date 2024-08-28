const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const choiceSchema = new Schema({
  question_id: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  content: { type: String, required: true },
  is_correct: { type: Boolean, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Choice', choiceSchema);
