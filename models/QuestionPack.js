const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionPackSchema = new Schema({
  level_id: { type: Schema.Types.ObjectId, ref: 'DifficultyLevel', required: true },
  pack_name: { type: String, required: true },
  number_of_questions: { type: Number, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
}, {
  timestamps: true
});

module.exports = mongoose.model('QuestionPack', questionPackSchema);
