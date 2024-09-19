const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt'); // Thêm thư viện bcrypt để mã hóa mật khẩu

const userSchema = new Schema({
  username: { type: String, unique: true, maxlength: 255, required: true },
  password: { type: String, maxlength: 255, required: true },
  email: { type: String, unique: true, required: true },
  profile_picture: { type: String },
  role: { type: Number, default: 1 },
  phoneNumber: { type: String, maxlength: 20 }, // 
  created_quizzes: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }]
}, {
  timestamps: true
});

// Mã hóa mật khẩu trước khi lưu
userSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
      this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});


module.exports = mongoose.model('User', userSchema);
