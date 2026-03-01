# E-Commerce Frontend

React + Vite + TailwindCSS frontend for the E-Commerce application.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

The app will open at `http://localhost:3000`

## 📁 Structure

```
src/
├── components/      # Reusable UI components
├── context/         # Global state (Auth, Cart)
├── pages/           # Page components
├── utils/           # Utilities (API client)
├── App.jsx          # Main app
└── main.jsx         # Entry point
```

## 🎨 Key Features

- **TailwindCSS**: Modern, utility-first styling
- **Context API**: Global state for auth and cart
- **React Router**: Client-side routing
- **Axios**: API communication
- **Responsive**: Mobile-first design

## 📦 Build for Production

```bash
npm run build
```

## 🔧 Environment Variables

Create `.env` if needed:
```
VITE_API_URL=http://localhost:5000
```
