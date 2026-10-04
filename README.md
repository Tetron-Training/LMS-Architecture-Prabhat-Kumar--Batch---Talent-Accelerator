# Tetron - Student Attendance Management System

Tetron is a modern, web-based student attendance tracking application. It features a complete administrative login system, a dynamic dashboard with live analytics, a master student roster, and an optimized daily attendance logging system.

---

## 👥 Project Team

*   **Developer:** [Prabhat Kumar]
*   **Mentor:** [Shantanu S. Morgaonkar]

---

## 🚀 Technical Stack

- **Backend:** Node.js, Express.js (v4+)
- **Database:** MongoDB via Mongoose ODM
- **Frontend Views:** EJS (Embedded JavaScript) Templates
- **Styling:** Custom CSS3 served via static Express pipelines

## 📁 Database Architecture & Schema

The application handles relational data inside MongoDB using three primary data models:
- **User:** Stores admin system credentials (`username`, `password`) ->(admin),(123)
- **Student:** Tracks immutable student records including unique Roll Numbers (`rollNo`), names, and their specific `batch`.
- **Attendance:** A time-series log structured around unique calendar dates (`date`), containing a sub-document array referencing individual Student IDs alongside their tracking state (`Present` or `Absent`).

## 🛠️ API & Endpoint Matrix

### Core Dashboard & Auth
- `GET /` -> Redirects automatically to the main dashboard.
- `GET /tetron` -> Displays the main controller layout, pulls historical logs, and computes live dashboard analytics (Total, Present, Absent, and Attendance Rate %).
- `POST /login` -> Validates administrator credentials against the database.
- `GET /logout` -> Clears the active session state.

### Student Management (Protected)
- `POST /students/add` -> Formats input, enforces unique roll numbers, and adds new students to the registry.
- `GET /students/delete/:id` -> Cascade deletes a student profile from the registry and extracts their structural nodes from all historical attendance sheets using a `$pull` query.

### Attendance Management (Protected)
- `POST /attendance/save` -> Saves daily data to the database using an `upsert` pipeline, updating existing entries or generating new entries as needed.

## 💻 Local Setup Instructions

1. Ensure you have **Node.js** and **MongoDB** installed and running on your local machine (`mongodb://127.0.0.1:27017`).
2. Clone this repository to your computer.
3. Install dependencies by running:
   ```bash
   npm install express mongoose ejs
   ```
4. Run the development server:
   ```bash
   node app.js
   ```
5. Open your web browser and navigate to `http://localhost:8080`.
