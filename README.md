# 🧰 MERN Job Portal App

A full-stack Job Portal built with the MERN (MongoDB, Express.js, React, Node.js) stack. The app allows two types of users: **Employers** who can post jobs and **Job Seekers** who can browse and apply for jobs.

---

## 📁 Folder Structure

mern-job-portal/
├── backend/ # Node.js + Express API
├── frontend/ # React app
├── .gitignore
└── README.md

---

## 🚀 Features

- 👤 User Authentication (Register/Login)
- 🔒 JWT-based Protected Routes
- 🧑‍💼 Role-Based Dashboards (Employer & Job Seeker)
- 📝 Post & Apply for Jobs
- ⚙️ Persistent Login via Cookies

---

## 🧪 Tech Stack

- **Frontend**: React, Axios, React Router
- **Backend**: Node.js, Express
- **Database**: MongoDB (via Mongoose)
- **Auth**: JWT + HTTP-only Cookies

---

## 🔧 Setup Instructions

### 1. Clone the Repo

git clone https://github.com/Anisha-GH/Job-Portal.git

cd mern-job-portal

### 2. Backend Setup

cd backend
npm install

Create backend/.env:

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret

Start the backend:

npm run dev

### 3. Frontend Setup

cd ../frontend
npm install

Create frontend/.env:

VITE_API_BASE_URL=http://localhost:5000/api

Start the frontend:

npm run dev

### 📦 Environment Variables Summary

backend/.env

PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

frontend/.env

VITE_API_BASE_URL=http://localhost:5000/api