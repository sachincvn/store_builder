# 🛒 Blinkit Clone -- 10 Minute Grocery Delivery App (India)

A production-ready **Blinkit-style 10-minute delivery app** built using
the **MERN Stack** with **MVVM architecture** and **Tailwind CSS**.

------------------------------------------------------------------------

## 🚀 Tech Stack

### Frontend

-   React.js (Vite)
-   Tailwind CSS
-   React Router DOM
-   Axios
-   Context API / Redux Toolkit

### Backend

-   Node.js
-   Express.js
-   MongoDB (Mongoose)
-   JWT Authentication
-   bcrypt (Password Hashing)
-   dotenv
-   CORS

------------------------------------------------------------------------

## 🏗 Architecture

### Backend Structure

    backend/
    │
    ├── config/
    ├── models/
    ├── repositories/
    ├── services/
    ├── controllers/
    ├── routes/
    ├── middlewares/
    ├── viewmodels/
    ├── utils/
    ├── seed/
    └── server.js

### Frontend Structure

    frontend/
    │
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── views/
    │   ├── viewmodels/
    │   ├── services/
    │   ├── store/
    │   ├── routes/
    │   ├── hooks/
    │   ├── layouts/
    │   ├── utils/
    │   └── App.jsx

------------------------------------------------------------------------

## ✨ Features

### 👤 User Features

-   Register / Login (JWT Authentication)
-   Browse categories
-   Search products
-   Add to cart
-   Quantity management
-   Checkout (COD)
-   Order history
-   Order status tracking

### 👨‍💼 Admin Panel

-   Admin dashboard
-   Add / Edit / Delete products
-   Manage categories
-   Manage stock
-   View all orders
-   Update order status
-   View revenue stats

------------------------------------------------------------------------

## 🗄 Database Models

### User

-   name
-   email
-   phone
-   password
-   role (user/admin)
-   createdAt

### Product

-   name
-   description
-   price
-   category
-   image
-   stock
-   rating
-   isAvailable

### Category

-   name
-   image

### Order

-   userId
-   products
-   totalAmount
-   address
-   status
-   paymentMethod
-   createdAt

------------------------------------------------------------------------

## 🔐 Authentication Flow

1.  User registers → Password hashed using bcrypt\
2.  Login → JWT token generated\
3.  Protected routes using middleware\
4.  Admin routes protected via role-based middleware

------------------------------------------------------------------------

## 🌱 Seed Data

The project includes a seed script that generates: - 5 categories - 30
products - 1 admin account

Run seed script:

``` bash
npm run seed
```

------------------------------------------------------------------------

## ⚙️ Installation Guide

### 1️⃣ Clone Repository

``` bash
git clone <your-repo-url>
cd blinkit-clone
```

### 2️⃣ Backend Setup

``` bash
cd backend
npm install
```

Create `.env` file:

    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    PORT=5000

Start backend:

``` bash
npm run dev
```

### 3️⃣ Frontend Setup

``` bash
cd frontend
npm install
npm run dev
```

Frontend will run on: http://localhost:5173

Backend will run on: http://localhost:5000

------------------------------------------------------------------------

## 📦 API Endpoints

### Auth

-   POST `/api/auth/register`
-   POST `/api/auth/login`

### Products

-   GET `/api/products`
-   GET `/api/products/:id`
-   POST `/api/products` (Admin)
-   PUT `/api/products/:id` (Admin)
-   DELETE `/api/products/:id` (Admin)

### Categories

-   GET `/api/categories`
-   POST `/api/categories` (Admin)

### Orders

-   POST `/api/orders`
-   GET `/api/orders/user`
-   GET `/api/orders/admin`
-   PUT `/api/orders/:id/status` (Admin)

------------------------------------------------------------------------

## 📱 Responsiveness

-   Mobile-first design
-   2-column product grid (mobile)
-   4-column grid (desktop)
-   Fully responsive layout

------------------------------------------------------------------------

## 📈 Future Improvements

-   Razorpay Integration
-   Real-time delivery tracking
-   Pincode-based serviceability
-   Microservices architecture
-   Docker deployment

------------------------------------------------------------------------

## 🧑‍💻 Author

Built as a scalable MERN stack quick-commerce application inspired by
modern Indian grocery delivery platforms.
