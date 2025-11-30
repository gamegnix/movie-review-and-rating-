import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Home.css'

function Home() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Movie Reviews</h1>
        <p>Discover, rate, and review your favorite movies</p>
        
        {isAuthenticated ? (
          <Link to="/movies" className="cta-button">
            Browse Movies
          </Link>
        ) : (
          <div className="cta-buttons">
            <Link to="/register" className="cta-button primary">
              Get Started
            </Link>
            <Link to="/login" className="cta-button secondary">
              Login
            </Link>
          </div>
        )}
      </div>

      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">⭐</div>
          <h3>Rate Movies</h3>
          <p>Share your opinion by rating movies from 1 to 5 stars</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📝</div>
          <h3>Write Reviews</h3>
          <p>Express your thoughts with detailed movie reviews</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3>Discover</h3>
          <p>Find new movies and see what others are watching</p>
        </div>
      </div>
    </div>
  )
}

export default Home
