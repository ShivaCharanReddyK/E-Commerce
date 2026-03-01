# E-Commerce Full-Stack Application

A modern, feature-rich E-Commerce platform built with the MERN stack (MongoDB, Express, React, Node.js). Perfect for showcasing full-stack development skills in fresher interviews.

![Tech Stack](https://img.shields.io/badge/React-18.2-blue) ![Node.js](https://img.shields.io/badge/Node.js-18+-green) ![MongoDB](https://img.shields.io/badge/MongoDB-7.0-brightgreen)

## 🎯 Project Highlights (For Resume/Interviews)

This project demonstrates:

- ✅ **Full-Stack Development**: Complete MERN stack implementation
- ✅ **System Design**: Modular architecture with separation of concerns
- ✅ **Authentication & Authorization**: JWT-based secure authentication
- ✅ **Advanced Search**: MongoDB Text Search integration for fast and efficient product discovery
- ✅ **State Management**: React Context API for global state
- ✅ **API Design**: RESTful API with proper HTTP methods and status codes
- ✅ **Database Design**: MongoDB schemas with relationships and validation
- ✅ **Modern UI/UX**: TailwindCSS with animations and responsive design
- ✅ **Containerization**: Docker setup for easy deployment

## 🚀 Features

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

## 💡 Interview Talking Points

### System Design

- **Separation of Concerns**: Routes → Controllers → Models
- **Middleware Pattern**: Validation, Authentication, Error Handling
- **Database Indexing**: MongoDB Text Search for efficient product discovery

### Security

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure, stateless authentication
- **Input Validation**: express-validator prevents injection attacks

### Scalability

- **MongoDB Search**: Built-in text indexing eliminates the need for external search engines for this scale
- **Stateless Auth**: JWT allows horizontal scaling
- **Docker**: Easy deployment and portability

### Best Practices

- **Environment Variables**: Sensitive data secured
- **Error Handling**: Centralized error responses
- **Logging**: Morgan for request tracking
- **Code Organization**: Modular, maintainable structure

## 🎨 Technologies Explained (For Beginners)

### Backend

- **Express**: Web framework for building APIs
- **Mongoose**: ODM (Object Data Modeling) for MongoDB
- **bcryptjs**: Password hashing library
- **jsonwebtoken**: JWT token generation and verification
- **express-validator**: Input validation middleware
- **morgan**: HTTP request logger

### Frontend

- **React**: UI library for building interfaces
- **Vite**: Fast build tool and dev server
- **TailwindCSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **Context API**: Global state management

### Infrastructure

- **MongoDB**: NoSQL database with built-in Full-Text Search
- **Docker**: Containerization platform

## 🚢 Deployment

### Option 1: VPS (DigitalOcean, AWS EC2)

1. Install Docker on server
2. Copy project files
3. Run `docker-compose up -d`
4. Configure domain and SSL

### Option 2: Platform as a Service

- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Render
- **Database**: MongoDB Atlas

## 📝 License

MIT License - Feel free to use this project for learning and portfolio purposes.

## 👨‍💻 Author

Built with ❤️ as a resume project for fresher interviews.

---

**⭐ If this helped you, please star the repository!**
