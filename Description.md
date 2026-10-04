# Tetron - Project Specification & Description

## 📌 Project Overview
**Tetron** is a compact, high-efficiency Student Attendance Management System designed to digitise classroom tracking workflows. Moving away from traditional, error-prone paper rosters, Tetron establishes an automated pipeline where course administrators can seamlessly log attendance records, manage student registers, and read real-time statistical analytics on a single administrative plane.

## 🎯 Target Audience & Use Case
The software is engineered primarily for educational institutes, bootcamps, and training centers looking for a self-hosted, lightweight utility that bypasses complex enterprise user-management frameworks. It focuses on absolute speed of data entry and low server resource footprints.

## 🧱 Functional Component Architecture
The operational flow of the system is split into three clean architectural vectors:

## 📂 File System Directory Architecture

The Tetron project follows a modular architectural model that decouples structural database models, client-facing presentation styles, and server-side compilation templates from the central application core.

```text
Tetron Technologies/
├── models/                  # 🗃️ Data Modeling Layer (Mongoose Schemas)
│   ├── Attendance.js       # Daily tracking records & time-series arrays
│   ├── Student.js          # Master registry records (names & roll numbers)
│   └── User.js             # Administrator authentication credentials
├── public/                  # 🎨 Static Delivery Pipeline (Client Access)
│   └── style.css           # Global presentation styles & UI layouts
├── views/                   # 🖥️ View Presentation Layer (EJS Blueprints)
│   └── index.ejs           # Monolithic main application layout template
├── app.js                   # ⚙️ App Controller (Express System Core)
├── package-lock.json       # Strict dependency structure lock manifest
└── package.json            # Scripts execution & node package registry
```

1. **Administrative Session Pipeline:** An in-memory runtime session framework managed on the Express server level via global tracker variables. This establishes an essential security perimeter blocking unauthenticated write/delete requests.
2. **Dynamic Templating Vector:** An HTML5 parsing structure driven by the **EJS Engine**, converting raw array logic, database query models, and statistical calculation structures into structured, human-readable UI grids.
3. **Data Integrity Pipeline:** An automated data persistence engine using **Mongoose Object Document Mapping (ODM)**. It handles formatting sanitisation (such as standardising text case parameters and trimming empty spaces) prior to saving records to the database collection.

---
**Developer:** [Prabhat Kumar]  
**Mentor:** [Shantanu S. Morgaonkar]
