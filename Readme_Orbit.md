# Orbit

Orbit is an ongoing project focused on building a secure and scalable backend system.  
This repository currently contains the backend structure only. The project is under active development and new features will be added progressively.  

---

## 📌 Current Progress
- Backend structure set up with Express.
- Authentication implemented with JWT and bcrypt.
- Controllers, middlewares, and models already created.
- Email service integrated using Nodemailer + Mailgen.
- Validation in place with Express Validator.
- MongoDB database connection with Mongoose.
- Environment configuration handled using dotenv.

---

## 🛠️ Tech Stack & Dependencies

### Core
- **Express** – Web framework for handling routes and middleware.  
- **Mongoose** – ODM for MongoDB.  
- **JWT (jsonwebtoken)** – Authentication and secure user sessions.  
- **bcrypt** – Password hashing.  

### Middleware & Utilities
- **express-validator** – Request data validation.  
- **cookie-parser** – Handling cookies in requests/responses.  
- **cors** – Enabling cross-origin requests.  
- **dotenv** – Environment variable management.  

### Mailing
- **Nodemailer** – Sending emails.  
- **Mailgen** – Generating dynamic email templates.  

### Development Tools
- **nodemon** – Automatic server restarts during development.  
- **prettier** – Code formatting.  
- **@types/express**, **@types/mongoose** – Type definitions for better IntelliSense.  

---

## 📂 Project Structure

The backend follows a modular structure for maintainability:

```
src/
│── controllers/   # Handles request logic (e.g., auth, user)
│── middlewares/   # Custom middlewares for validation, auth, etc.
│── models/        # Mongoose models (User, Tokens, etc.)
│── routes/        # Route definitions (auth, healthcheck, etc.)
│── utils/         # Utility classes (ApiError, ApiResponse, Mail setup)
│── validators/    # Request validation rules
│── app.js         # App configuration
│── server.js      # Server entry point
```

---

## 🚧 Status
- The project is ongoing.  
- Current focus: strengthening authentication, expanding features, and refining API endpoints.  
- Frontend will be integrated later once the backend is stable.  

---
