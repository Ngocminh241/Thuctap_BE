const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  quiz_id: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  score: { type: Number, required: true },
  played_at: { type: Date, default: Date.now },
  answers: [{
    question_id: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    user_choices: [{ type: Schema.Types.ObjectId, ref: 'Choice' }],
    is_correct: { type: Boolean }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Result', resultSchema);
