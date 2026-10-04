const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 8080;  
const path = require('path');

// Import your database model drivers
const User = require('./models/User');
const Student = require('./models/Student');
const Attendance = require('./models/Attendance');

const MONGO_URI = "mongodb://127.0.0.1:27017/tetron";

/* EXPRESS SERVER STRUCTURAL CONFIGURATIONS */

// Instruct Express to serve static files (like style.css) inside the public folder automatically
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Core Parsing Middleware Pipelines (Enables reading text from HTML forms)
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

// 💡 NEW SIMPLIFIED STATE: A simple global variable to remember who is logged in!
// When the app starts, nobody is logged in (null).
let currentUserSession = null;

// Connect to running MongoDB Instance
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  }).catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });

/* ROUTING CONTROLLERS & SERVER LOGIC */

app.get('/', (req, res) => {
    res.redirect('/tetron');
});

// Main Hub Layout Route Handler
app.get("/tetron", async (req, res) => {
    // Fallback onto today's date if no date query is provided in the URL bar
    const selectedDate = req.query.date || new Date().toISOString().split('T')[0];
    
    let renderedRecords = [];
    let errorMsg = req.query.error || null;
    
    // Initializing our live analytics boxes counters
    let stats = { total: 0, present: 0, absent: 0, rate: 0 };

    // If a user is logged in, load the student roster data from MongoDB
    if (currentUserSession) {
        try {
            let attendanceSheet = await Attendance.findOne({ date: selectedDate }).populate('records.studentId');
            
            if (!attendanceSheet) {
                // If no logs exist for this date yet, load students registry to build a fresh present sheet
                const allStudents = await Student.find().sort({ rollNo: 1 });
                renderedRecords = allStudents.map(student => ({
                    studentId: student,
                    status: 'Present'
                }));
            } else {
                renderedRecords = attendanceSheet.records;
            }

            // Calculate Live Statistics metrics using basic array logic
            stats.total = renderedRecords.length;
            stats.present = renderedRecords.filter(r => r.status === 'Present').length;
            stats.absent = stats.total - stats.present;
            stats.rate = stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0;

        } catch (err) {
            errorMsg = "Error loading database records.";
        }
    }

    // Render index.ejs and pass down plain JavaScript data objects
    res.render("index.ejs", {
        user: currentUserSession, // Passes the global user state down to the HTML template
        error: errorMsg,
        selectedDate: selectedDate,
        records: renderedRecords,
        stats: stats
    });
});

// Authentication Sign-In Request Handler (Plain Text Validation)
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user matching the form inputs
        const user = await User.findOne({ username });
        
        // Plain text password comparison (No complex cryptographic hashing needed)
        if (user && user.password === password) {
            // Save the user profile to our global tracker variable!
            currentUserSession = user;
            return res.redirect('/tetron');
        } else {
            return res.redirect('/tetron?error=Invalid username or password credentials.');
        }
    } catch (err) {
        return res.redirect('/tetron?error=Internal server login error.');
    }
});

// Add New Student Transaction Route
app.post('/students/add', async (req, res) => {
    // Guard Check: Make sure someone is logged in before allowing writes to MongoDB
    if (!currentUserSession) return res.redirect('/tetron?error=Unauthorized: Please login first.');

    try {
        const { rollNo, name, batch } = req.body;

        // Ensure the Roll Number isn't already assigned to another student
        const existingStudent = await Student.findOne({ rollNo: rollNo.toUpperCase().trim() });
        if (existingStudent) {
            return res.redirect('/tetron?error=Registration Failed: This Roll Number already exists.');
        }

        // Commit the fresh record directly to MongoDB
        const newStudent = new Student({
            rollNo: rollNo.toUpperCase().trim(),
            name: name.trim(),
            batch: batch ? batch.trim() : 'Batch 2026'
        });
        await newStudent.save();

        res.redirect('/tetron');
    } catch (err) {
        console.error("Failed to add student:", err);
        res.redirect('/tetron?error=Error while adding student.');
    }
});

// Delete Student Profile Route
app.get('/students/delete/:id', async (req, res) => {
    if (!currentUserSession) return res.redirect('/tetron?error=Unauthorized: Please login first.');

    const selectedDate = req.query.date || new Date().toISOString().split('T')[0];
    const studentId = req.params.id;

    try {
        // Remove from Master Registry Table
        await Student.findByIdAndDelete(studentId);

        // Remove this student's records from old historical attendance logs
        await Attendance.updateMany(
            {}, 
            { $pull: { records: { studentId: studentId } } }
        );

        res.redirect(`/tetron?date=${selectedDate}`);
    } catch (err) {
        console.error("Failed to delete student:", err);
        res.redirect(`/tetron?date=${selectedDate}&error=Error while removing student.`);
    }
});

// Save or Update Attendance records
app.post('/attendance/save', async (req, res) => {
    if (!currentUserSession) return res.redirect('/tetron?error=Unauthorized: Please login first.');

    const { date } = req.body;
    
    try {
        const allStudents = await Student.find();
        const recordsPayload = [];

        // Build the records array based on form inputs
        for (let student of allStudents) {
            const statusValue = req.body[`status_${student._id}`] || 'Present';
            recordsPayload.push({
                studentId: student._id,
                status: statusValue
            });
        }

        // Save data to the database using an upsert configuration
        await Attendance.findOneAndUpdate(
            { date: date },
            { records: recordsPayload },
            { upsert: true, returnDocument: 'after' }
        );

        res.redirect(`/tetron?date=${date}`);
    } catch (err) {
        res.redirect('/tetron?error=Failed to save attendance logs.');
    }
});

// Logout Handler (Resets our global session variable back to null)
app.get('/logout', (req, res) => {
    currentUserSession = null;
    res.redirect('/tetron');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});