# Movie Review and Rating Application

A full-stack web application for reviewing and rating movies. Users can register, login, browse movies, write reviews, and rate movies.

## Features

- 🔐 User Authentication (Register, Login, Logout)
- 🎬 Movie Browsing
- ⭐ Movie Rating System (1-5 stars)
- 📝 Write and View Reviews
- 👤 User Profile Management
- 🌓 Light/Dark Theme Toggle
- 📱 Responsive Design

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- React
- React Router
- Axios
- Vite
- CSS (Custom styling with theme support)

## Project Structure

```
movie review and rating/
├── backend/
│   ├── src/
│   │   ├── config.js
│   │   ├── index.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   └── User.js
│   │   └── routes/
│   │       └── auth.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend folder:
   ```env
   JWT_SECRET=your-secret-key-here
   MONGODB_URI=mongodb://localhost:27017/moviereview
   PORT=4000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:4000`

### Frontend Setup

1. Navigate to frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update user profile (protected)
- `PUT /api/auth/password` - Change password (protected)
- `GET /api/auth/verify` - Verify token (protected)

## Usage

1. Start MongoDB (if using local MongoDB)
2. Start the backend server
3. Start the frontend development server
4. Open `http://localhost:3000` in your browser
5. Register a new account or login
6. Browse movies and write reviews!

## Environment Variables

### Backend (.env)
- `JWT_SECRET` - Secret key for JWT tokens
- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 4000)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS

## Author

[Your Name]

## License

This project is for educational purposes.

