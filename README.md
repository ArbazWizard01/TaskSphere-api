# TaskSphere API

TaskSphere API is a lightweight and scalable backend built using **Node.js**, **Express**, and **MongoDB**. It includes secure authentication, profile management, and CRUD APIs for tasks — ideal for integration with modern frontend frameworks like React or Next.js.

This backend was developed as part of an internship assignment to demonstrate capability in API development, authentication, validation, and scalable backend architecture.

---

## 🚀 Features

### 🔐 Authentication (JWT)

* User registration
* User login
* Password hashing using bcrypt
* JWT-based protected routes

### 👤 Profile Management

* Fetch logged-in user profile
* Update profile (name, email, phone, bio, avatar)

### 📝 Task CRUD (Sample Entity)

* Create a task
* Get all tasks
* Update a task
* Delete a task

### 🛡 Security

* Hashed passwords
* JWT authentication middleware
* Input validation using express-validator
* Modular structure for scalability

---

## 🗂 Project Structure

```
TaskSphere-api/
│── controllers/
│── routes/
│── middlewares/
│── config/
│── utils/
│── index.js
│── package.json
│── .env (ignored)
└── README.md
```

---

## ⚙️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB** (Native driver, no Mongoose)
* **jsonwebtoken**
* **bcryptjs**
* **express-validator**
* **dotenv**

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/ArbazWizard01/TaskSphere-api.git
cd TaskSphere-api
```

Install dependencies:

```bash
npm install
```

---

## 🔧 Environment Variables

Create a `.env` file in the project root and add:

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
```

**Note:** `.env` is already included in `.gitignore`.

---

## ▶️ Run the Server

Start the development server:

```bash
npm run dev
```

Server will run at:

```
http://localhost:5000
```

---

## 📌 API Endpoints

### 🔐 Auth Endpoints

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | /api/auth/register | Register a new user |
| POST   | /api/auth/login    | Login a user        |

### 👤 Profile Endpoints

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | /api/profile     | Fetch user profile  |
| PUT    | /api/profile/:id | Update user profile |

### 📝 Task Endpoints

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| POST   | /api/tasks     | Create a task |
| GET    | /api/tasks     | Get all tasks |
| PUT    | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

---

## 📂 Postman Collection

You can import the Postman collection to test all API routes.
*(If you upload one, link it here.)*

---

## 🧠 Scalability Plan

To scale this backend for production:

* Use **MongoDB Atlas** for cloud database hosting
* Add **rate limiting** and **Helmet** for security
* Containerize using **Docker**
* Deploy using Render, Railway, or AWS
* Use separate `.env` files for different environments
* Modularize features into microservices if needed

---

## 🧑‍💻 Author

**Arbaz Ansari (ArbazWizard01)**
Frontend Developer | MERN Stack Developer

---

## ⭐ Support

If you found this helpful, please ⭐ the repository!
