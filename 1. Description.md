# Tetron - Project Specification & Description

## 📌 Project Overview
**Tetron** is a lightweight, high-efficiency Student Attendance Management System designed to digitise classroom tracking workflows. Moving away from traditional, error-prone paper rosters, Tetron establishes an automated pipeline where course administrators can seamlessly log attendance records, manage student registers, and read real-time statistical analytics on a single administrative dashboard canvas.

## 🎯 Target Audience & Use Case
The software is engineered primarily for educational institutes, bootcamps, and training centers looking for a self-hosted, lightweight utility that bypasses complex enterprise user-management frameworks. It focuses on absolute speed of data entry and low server resource footprints.

---

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

---

## 🧱 Component Architecture Analysis

### 1. The `models/` Directory (Data Blueprints)
This capsule houses your structural object-document relationship mappings for MongoDB. By separating schemas into this folder:
- Individual data structures are isolated using `module.exports` and integrated back into the main controller line via clean relative pathing bindings (`require('./models/Student')`).
- Database logic modifications are completely decoupled from the routing configuration, ensuring structural flexibility.

### 2. The `public/` Directory (Static Asset Pipeline)
This folder maps your static delivery infrastructure directly to the client browser, governed by the middleware configuration `app.use(express.static(path.join(__dirname, 'public')))`.
- **`style.css`:** Since this file sits immediately inside `public/`, your EJS layout (`index.ejs`) references it directly as an absolute root path (`<link rel="stylesheet" href="/style.css">`) rather than through a nested `/css/` folder loop.

### 3. The `views/` Directory (Dynamic UI Templates)
This directory forms your server-side rendering (SSR) processing pipeline, managed inside the runtime configuration via `app.set('views', path.join(__dirname, 'views'))`.
- **`index.ejs`:** This document functions as a dynamic blueprint rather than static HTML. The controller compiles incoming data elements directly into this markup page before serving the finished layout back to the network.

### 4. The Runtime Roots (`app.js` & `package.json`)
- **`app.js`:** The foundational orchestrator script acting as the execution point. It opens database handshakes, boots the HTTP port listen vector, hooks parsing middleware, and processes application controller endpoints.
- **`package.json`:** The configuration engine manifest detailing operational launch configurations (like `nodemon app.js`) and tracking external framework imports (`express`, `mongoose`, `ejs`).

---

## 👥 Project Team

*   **Developer:** [Prabhat Kumar]
*   **Mentor:** [Shantanu S. Morgaonkar]
