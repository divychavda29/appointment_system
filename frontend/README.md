# 🏥 Hospital Management System - Frontend

This is the frontend of the Hospital Management System built using React.js. The UI is modern, responsive, and connected to a backend server for authentication, doctor listings, and appointment booking.

## 🚀 Features

- 🔐 User Login & Signup
- 👨‍⚕️ View all doctors (by specialty)
- 📅 Book Appointments
- 🗓️ My Appointments Dashboard
- 👤 My Profile Page with editable details
- 🔽 Responsive Navbar with User Dropdown
- 🌙 Dark mode-ready styling (optional)

## 🛠️ Tech Stack

- ⚛️ React.js (with Vite)
- 🎨 Tailwind CSS for styling
- 🔃 React Router DOM
- 🔐 Uses backend API via Fetch
- 💾 Stores auth info in LocalStorage

## 📁 Folder Structure

frontend/
├── assets/ # All images/icons
├── components/ # Navbar, Footer, etc.
├── pages/ # Route-based pages
├── context/ # App-wide context
├── App.jsx # App routes and layout
├── main.jsx # ReactDOM render entry
└── index.css # Tailwind base styles


## 📦 Setup Instructions

1. 📥 Clone the repository:
```bash
git clone https://github.com/divychavda29/hospital-management
cd hospital-management/frontend

2. 📦 Install dependencies:
bash
Copy
Edit
npm install

3.🏃 Start the development server:
bash
Copy
Edit
npm run dev

4. 🌐 Open in browser:
arduino
Copy
Edit
http://localhost:5173

🔗 API Endpoints Used
| Method | Endpoint                           | Purpose            |
| ------ | ---------------------------------- | ------------------ |
| POST   | `/api/auth/signup`                 | User Signup        |
| POST   | `/api/auth/login`                  | User Login         |
| GET    | `/api/auth/profile/:id`            | Get User Profile   |
| GET    | `/api/doctors`                     | Get all doctors    |
| POST   | `/api/appointments/book`           | Book Appointment   |
| GET    | `/api/appointments/user/:userId`   | My Appointments    |
| DELETE | `/api/appointments/:appointmentId` | Cancel Appointment |


🙋‍♂️ Author
Made with 💙 by Divya Chavda

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
