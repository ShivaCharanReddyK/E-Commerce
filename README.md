# E-Commerce Full-Stack Application

A modern, feature-rich E-Commerce platform built with the MERN stack (MongoDB, Express, React, Node.js). Perfect for showcasing full-stack development skills in fresher interviews.

![Tech Stack](https://img.shields.io/badge/React-18.2-blue) ![Node.js](https://img.shields.io/badge/Node.js-18+-green) ![MongoDB](https://img.shields.io/badge/MongoDB-7.0-brightgreen)

### Frontend (React + Vite + TailwindCSS)

- 🏠 Modern landing page with hero section
- 🔍 Product search with MongoDB Text Search (filters, category matching)
- 🛍️ Product catalog with category filtering and sorting
- 🛒 Shopping cart with localStorage persistence
- 📦 Order history and tracking
- 🔐 User authentication (Register/Login)
- 📱 Fully responsive design
- ✨ Smooth animations and transitions

### Backend (Node.js + Express)

- 🔑 JWT authentication with bcrypt password hashing
- 📝 Input validation using express-validator
- 📊 MongoDB aggregation for analytics
- 🔍 MongoDB Text Search integration for product discovery
- 🛡️ Error handling middleware
- 📋 Request logging with Morgan
- 🔄 RESTful API design

### Database

- **MongoDB**: Users, Products (with Text Indexes), Orders

## 📁 Project Structure

```
E-Commerce/
├── backend/                 # Node.js backend
│   ├── config/             # Database configurations
│   ├── controllers/        # Business logic
│   ├── middleware/         # Custom middleware
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   └── server.js           # Entry point
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # Global state (Auth, Cart)
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utilities (Axios instance)
│   │   └── App.jsx        # Main app component
│   └── package.json
└── docker-compose.yml     # Docker setup
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- MongoDB (Local or Docker)

### Step 1: Clone the Repository

```bash
cd E-Commerce
```

### Step 2: Start Database (MongoDB)

```bash
docker-compose up -d
```

This will start:

- MongoDB on `localhost:27017`

### Step 3: Setup Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend will run on `http://localhost:5000`

### Step 4: Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:3000`

## 📚 API Documentation

### Authentication

| Method | Endpoint             | Description                  |
| ------ | -------------------- | ---------------------------- |
| POST   | `/api/auth/register` | Register new user            |
| POST   | `/api/auth/login`    | Login user                   |
| GET    | `/api/auth/me`       | Get current user (Protected) |

### Products

| Method | Endpoint            | Description                     |
| ------ | ------------------- | ------------------------------- |
| GET    | `/api/products`     | Get all products (with filters) |
| GET    | `/api/products/:id` | Get product by ID               |
| POST   | `/api/products`     | Create product (Protected)      |
| PUT    | `/api/products/:id` | Update product (Protected)      |
| DELETE | `/api/products/:id` | Delete product (Protected)      |

### Search

| Method | Endpoint               | Description     |
| ------ | ---------------------- | --------------- |
| GET    | `/api/search?q=laptop` | Search products |

### Orders

| Method | Endpoint                | Description                   |
| ------ | ----------------------- | ----------------------------- |
| POST   | `/api/orders`           | Create order (Protected)      |
| GET    | `/api/orders/my-orders` | Get user's orders (Protected) |
| GET    | `/api/orders/:id`       | Get order by ID (Protected)   |

## 🧪 Testing the Application

### 1. Add Sample Products

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "MacBook Pro",
    "description": "High-performance laptop for professionals",
    "price": 129900,
    "category": "Electronics",
    "stock": 10,
    "rating": 4.8,
    "image": "https://via.placeholder.com/300"
  }'
```

### 2. Search Products

```bash
curl "http://localhost:5000/api/search?q=macbook"
```



**⭐ If this helped you, please star the repository!**
