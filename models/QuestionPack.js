const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionPackSchema = new Schema({
  level_id: { type: Schema.Types.ObjectId, ref: 'DifficultyLevel', required: true },
  pack_name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('QuestionPack', questionPackSchema);
