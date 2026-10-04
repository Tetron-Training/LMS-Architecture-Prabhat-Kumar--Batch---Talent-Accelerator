const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    rollNo: { type: String, required: true, unique: true, uppercase: true },
    name: { type: String, required: true, trim: true },
    batch: { type: String, default: 'Batch 2026' }
});

module.exports = mongoose.model('Student', StudentSchema);
