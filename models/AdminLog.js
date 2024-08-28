const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminLogSchema = new Schema({
  admin_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  target: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('AdminLog', adminLogSchema);
