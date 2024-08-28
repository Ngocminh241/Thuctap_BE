const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  created_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  image: { type: String },
  total_plays: { type: Number, default: 0 },
  is_public: { type: Boolean, default: false },
  needs_approval: { type: Boolean, default: false },
  approved_by: { type: Schema.Types.ObjectId, ref: 'User' },
  approved_at: { type: Date },
  difficulty_level: { type: Schema.Types.ObjectId, ref: 'DifficultyLevel' },
  question_pack: { type: Schema.Types.ObjectId, ref: 'QuestionPack' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Quiz', quizSchema);
