# E-Commerce Backend API

A RESTful API built with Node.js, Express, and MongoDB for a modern e-commerce application.

## 🚀 Features

- **Authentication**: JWT-based user registration and login
- **Product Management**: Full CRUD operations for products
- **Advanced Search**: MongoDB Text Search-powered search with filters
- **Order Management**: Create and track orders
- **Validation**: Input validation using express-validator
- **Logging**: Request logging with Morgan
- **Error Handling**: Centralized error handling

## 📋 Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose (for MongoDB)

## 🛠️ Installation

### 1. Clone the repository
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` if needed (default values work for local development).

### 4. Start databases with Docker
```bash
# From the project root directory
docker-compose up -d
```

This will start:
- MongoDB on `localhost:27017`

### 5. Start the server
```bash
npm run dev
```

The API will be running at `http://localhost:5000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Products
- `GET /api/products` - Get all products (with optional filters)
  - Query params: `category`, `minPrice`, `maxPrice`, `sort`
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (requires auth)
- `PUT /api/products/:id` - Update product (requires auth)
- `DELETE /api/products/:id` - Delete product (requires auth)

### Orders
- `POST /api/orders` - Create order (requires auth)
- `GET /api/orders/my-orders` - Get user's orders (requires auth)
- `GET /api/orders/:id` - Get order by ID (requires auth)

### Search
- `GET /api/search` - Search products
  - Query params: `q` (search term), `category`, `minPrice`, `maxPrice`

## 🧪 Testing the API

### 1. Register a user
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"123456"}'
```

### 2. Create a product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name":"Laptop",
    "description":"High-performance laptop",
    "price":999,
    "category":"Electronics",
    "stock":10,
    "rating":4.5
  }'
```

### 3. Search products
```bash
curl "http://localhost:5000/api/search?q=laptop"
```

## 📁 Project Structure

```
backend/
├── config/              # Database configurations
├── controllers/         # Route controllers (business logic)
├── middleware/          # Custom middleware
├── models/              # MongoDB schemas
├── routes/              # API routes
├── server.js           # Entry point
├── package.json
└── .env.example
```

## 🔑 Key Technologies Explained

### Express-Validator
Used for validating user input (emails, passwords, etc.) to ensure data quality.

### Morgan
Logs every HTTP request to the console for debugging.

### JWT (JSON Web Tokens)
Used for secure authentication. When a user logs in, they get a token that proves who they are.

### Mongoose
Makes working with MongoDB easier by providing schemas and validation.

### MongoDB Text Search
Provides fast, built-in search capabilities with word stemming and relevance scoring directly within the database.

## 💡 For Interviews

**Things to highlight:**
1. **Modular Architecture**: Separated routes, controllers, and models
2. **Security**: Password hashing with bcrypt, JWT authentication
3. **Validation**: Input validation on all user inputs
4. **Error Handling**: Centralized error handler
5. **Scalability**: MongoDB Text Search and efficient indexing
6. **Best Practices**: Environment variables, logging, proper HTTP status codes

## 📝 License

MIT
