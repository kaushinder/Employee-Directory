# Employee Directory — MERN Full Stack Project

A full-stack **Employee Directory** application built with the **MERN** stack (MongoDB, Express, React, Node).  
Allows adding, updating, deleting and viewing employees, with search, department filtering and image upload.


Folder Structure:

# Frontend:
frontend/
├── dist/
├── node_modules/
├── public/
├── src/
│ ├── components/
│ │ ├── EmployeeCard.jsx
│ │ └── Navbar.jsx
│ ├── pages/
│ │ ├── CreatePage.jsx
│ │ ├── EmployeeDetailPage.jsx
│ │ └── HomePage.jsx
│ ├── store/
│ │ └── employee.js
│ ├── App.jsx
│ └── main.jsx
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js

### backend:
backend/
├── config/
│ └── db.js # MongoDB connection setup
├── controllers/
│ └── employee.controller.js
├── models/
│ └── employee.model.js
├── routes/
│ └── employee.route.js
└── server.js # Express entry point

About This Project:

- ⚛️ Tech Stack: React.js, Node.js, Express.js, MongoDB, Chakra UI
- 🔥 Build an API
- 📱 Responsive UI With React.js and ChakraUI
- 🐞 Error Handling
- 🌐 Deployment

Api Endpoints:


| Method | Endpoint          | Description         |
| ------ | ------------------ | ------------------- |
| GET    | /api/employees     | Get all employees   |
| GET    | /api/employees/:id | Get employee by ID  |
| POST   | /api/employees     | Create new employee |
| PUT    | /api/employees/:id | Update employee     |
| DELETE | /api/employees/:id | Delete employee     |





### Setup .env file

```shell
MONGO_URI=your_mongo_uri
PORT=5000
```

### Run this app locally

```shell
npm run build
```

### Start the app

```shell
npm run start
