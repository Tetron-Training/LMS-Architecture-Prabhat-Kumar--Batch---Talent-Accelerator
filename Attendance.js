const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    date: { type: String, required: true }, // Format: YYYY-MM-DD
    records: [
        {
            studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
            status: { type: String, enum: ['Present', 'Absent', 'Pending'], default: 'Pending' }
        }
    ]
}, { timestamps: true });

AttendanceSchema.index({ date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);
