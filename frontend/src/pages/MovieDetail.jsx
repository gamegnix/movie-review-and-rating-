import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './MovieDetail.css'

const MovieDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [hoveredRating, setHoveredRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  // Sample movie data - In a real app, fetch from API
  const movie = {
    id: parseInt(id),
    title: 'The Shawshank Redemption',
    year: 1994,
    genre: 'Drama',
    description:
      'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    director: 'Frank Darabont',
    rating: 4.8,
    poster: '🎬',
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (rating === 0) {
      alert('Please select a rating')
      return
    }

    // In a real app, submit to backend API
    console.log('Submitting review:', { movieId: id, rating, review })
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setRating(0)
      setReview('')
      navigate('/movies')
    }, 2000)
  }

  return (
    <div className="movie-detail">
      <button onClick={() => navigate('/movies')} className="back-button">
        ← Back to Movies
      </button>

      <div className="movie-detail-header">
        <div className="movie-poster-large">{movie.poster}</div>
        <div className="movie-detail-info">
          <h1>{movie.title}</h1>
          <div className="movie-meta">
            <span>{movie.year}</span>
            <span>•</span>
            <span>{movie.genre}</span>
            <span>•</span>
            <span>Director: {movie.director}</span>
          </div>
          <div className="movie-rating-display">
            <span>⭐</span>
            <span>{movie.rating}</span>
          </div>
          <p className="movie-description">{movie.description}</p>
        </div>
      </div>

      <div className="review-section">
        <h2>Write a Review</h2>
        <form onSubmit={handleSubmit} className="review-form">
          <div className="rating-input">
            <label>Your Rating:</label>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star ${star <= (hoveredRating || rating) ? 'active' : ''}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                >
                  ⭐
                </button>
              ))}
            </div>
            {rating > 0 && <span className="rating-text">{rating} out of 5</span>}
          </div>

          <div className="form-group">
            <label htmlFor="review">Your Review (Optional)</label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your thoughts about this movie..."
              rows={6}
            />
          </div>

          <button type="submit" className="submit-button" disabled={submitted}>
            {submitted ? 'Review Submitted! ✓' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default MovieDetail

