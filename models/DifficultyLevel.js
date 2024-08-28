const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const difficultyLevelSchema = new Schema({
  level_name: { type: String, required: true },
  description: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('DifficultyLevel', difficultyLevelSchema);
