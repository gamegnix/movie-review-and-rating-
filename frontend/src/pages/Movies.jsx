import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import './Movies.css'

const Movies = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  // Sample movies data - In a real app, this would come from your backend
  const sampleMovies = [
    {
      id: 1,
      title: 'The Shawshank Redemption',
      year: 1994,
      genre: 'Drama',
      rating: 4.8,
      poster: '🎬',
    },
    {
      id: 2,
      title: 'The Godfather',
      year: 1972,
      genre: 'Crime, Drama',
      rating: 4.9,
      poster: '🎭',
    },
    {
      id: 3,
      title: 'The Dark Knight',
      year: 2008,
      genre: 'Action, Crime, Drama',
      rating: 4.7,
      poster: '🦇',
    },
    {
      id: 4,
      title: 'Pulp Fiction',
      year: 1994,
      genre: 'Crime, Drama',
      rating: 4.6,
      poster: '💼',
    },
    {
      id: 5,
      title: 'Inception',
      year: 2010,
      genre: 'Action, Sci-Fi, Thriller',
      rating: 4.5,
      poster: '🌀',
    },
    {
      id: 6,
      title: 'Forrest Gump',
      year: 1994,
      genre: 'Drama, Romance',
      rating: 4.6,
      poster: '🏃',
    },
  ]

  useEffect(() => {
    // Simulate API call - Replace with actual API endpoint when backend is ready
    setTimeout(() => {
      setMovies(sampleMovies)
      setLoading(false)
    }, 500)
  }, [])

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="movies">
      <div className="movies-header">
        <h1>Movies</h1>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="movies-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movies/${movie.id}`}
              className="movie-card"
            >
              <div className="movie-poster">{movie.poster}</div>
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p className="movie-year">{movie.year}</p>
                <p className="movie-genre">{movie.genre}</p>
                <div className="movie-rating">
                  <span>⭐</span>
                  <span>{movie.rating}</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="no-results">
            <p>No movies found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Movies

