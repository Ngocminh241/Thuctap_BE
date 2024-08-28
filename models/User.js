const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true, maxlength: 255, required: true },
  password: { type: String, maxlength: 255, required: true },
  email: { type: String, unique: true, required: true },
  profile_picture: { type: String },
  role: { type: String, enum: ['Admin', 'User'], default: 'User' },
  created_quizzes: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
