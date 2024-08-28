const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  quiz_id: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  content: { type: String, required: true },
  image: { type: String },
  is_multiple_choice: { type: Boolean, default: true },
  minimum_choices: { type: Number, default: 2 },
  maximum_choices: { type: Number, default: 4 },
  choices: [{ type: Schema.Types.ObjectId, ref: 'Choice' }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Question', questionSchema);
