# Movie Review & Rating - Frontend

A modern React frontend application for reviewing and rating movies.

## Features

- 🔐 **Authentication** - User registration and login
- 🎬 **Movie Reviews** - Browse movies and write reviews
- ⭐ **Ratings** - Rate movies from 1 to 5 stars
- 👤 **User Profile** - Manage your profile and settings
- 🌓 **Theme Support** - Light and dark mode
- 📱 **Responsive Design** - Works on all devices

## Tech Stack

- **React 18** - UI library
- **React Router** - Navigation
- **Vite** - Build tool
- **Axios** - HTTP client
- **CSS Variables** - Theming

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable components
│   ├── context/         # React contexts (Auth, Theme)
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## API Integration

The frontend is configured to communicate with the backend API running on `http://localhost:4000`. The Vite proxy is set up to forward `/api` requests to the backend.

## Environment Variables

No environment variables are required for the frontend. The API base URL is configured in `vite.config.js`.

## Available Routes

- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/movies` - Movies list (protected)
- `/movies/:id` - Movie detail and review (protected)
- `/profile` - User profile (protected)

## Notes

- The movie data is currently using sample data. You'll need to integrate with your backend API for real movie data.
- Authentication tokens are stored in localStorage.
- Theme preferences are synced with the user profile in the backend.

