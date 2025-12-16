📌 SENTRA – Student Incident Reporting System

SENTRA is a role-based web application designed to improve safety, transparency, and communication within educational institutions.
It enables students and staff to report incidents securely, while administrators and super administrators manage and monitor these reports through dedicated dashboards.

This project is developed as part of an academic / internship project using the MERN Stack.


---

🎯 Problem Statement

Educational institutions often lack a centralized system for:

Reporting incidents safely

Tracking incident resolution

Managing awareness resources

Maintaining transparency between students, staff, and administration


SENTRA solves this by providing a structured, secure, and role-based platform.


---

🚀 Key Features

🔐 Authentication & Authorization

Secure JWT-based authentication

Role-based access control

Separate dashboards for each role



---

👥 User Roles & Capabilities

🟣 Super Admin

Create and manage institutions

View all registered institutions

Delete institutions (system-level control)


🔵 Admin (Institution Level)

View and manage all incidents in their institution

Update incident status (Pending / In Progress / Resolved)

Manage students and staff

Create and manage awareness content

View institution-level dashboard statistics


🟢 Student

Report incidents (optionally anonymously)

Track their reported incidents

View awareness articles

Access personal dashboard


🟠 Staff

Report incidents

Track their own reports

View awareness resources

Access staff dashboard



---

📊 Dashboards

Each role has a dedicated dashboard:

Summary statistics

Quick navigation actions

Clean and minimal UI



---

🧠 Awareness Hub

Admins can create awareness articles (e.g., safety guidelines, anti-bullying tips)

Students and staff can view awareness resources



---

🛠 Tech Stack

Frontend

React (Vite)

Tailwind CSS

Axios

React Router DOM


Backend

Node.js

Express.js

JWT Authentication

Role-based middleware


Database

MongoDB Atlas

Mongoose ODM



---

📂 Project Structure

Sentra/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── layout/
│   │   ├── services/
│   │   ├── context/
│   │   └── App.jsx
│   └── index.html
│
└── README.md


---

🔑 Demo Login Credentials (For Evaluation Only)

> ⚠ These credentials are temporary and provided only for project demonstration and evaluation purposes.



Super Admin

Email: superadmin@sentra.com

Password: SuperAdmin@123


Admin

Email: demo@sentra.admin

Password: Admin@123


Student

Email: demoStudent@gmail.com

Password: 2lbji8ynA1@


Staff

Email: demoStaff@gmail.com

Password: uhhnaz2mA1@



---

⚙ Setup Instructions

1️⃣ Clone the Repository

git clone https://github.com/your-username/sentra.git
cd sentra


---

2️⃣ Backend Setup

cd backend
npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key

Run backend:

npm run dev


---

3️⃣ Frontend Setup

cd frontend
npm install
npm run dev


---

🔐 Security Notes

Passwords are hashed using bcrypt

JWT tokens are used for secure authentication

Role-based middleware prevents unauthorized access

Demo credentials should be removed in production



---

📌 Future Enhancements

Email notifications for incident updates

File upload support for incident evidence

Analytics and reporting

Multi-language support

Production deployment with CI/CD



---

🎓 Academic Declaration

This project is developed solely for educational and internship purposes.
All data used is sample-based and non-sensitive.