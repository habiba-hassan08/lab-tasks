import { useState } from "react";
import "./styles.css";

function App() {
  const [movies, setMovies] = useState<any[]>([]);
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);

  function addMovie(event: React.FormEvent) {
    event.preventDefault();

    if (movieName.trim() === "") {
      return;
    }

    const newMovie = {
      id: Date.now(),
      name: movieName.trim(),
      review: review.trim(),
      rating: Number(rating),
    };

    setMovies([...movies, newMovie]);
    setMovieName("");
    setReview("");
    setRating(5);
  }

  function removeMovie(id: number) {
    setMovies(movies.filter((movie) => movie.id !== id));
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">🎬 Movie Diary</div>
        <p>Your personal movie collection</p>
      </header>

      <main className="container">
        <section className="intro">
          <h1>My Watch List</h1>
          <p>Keep track of the movies you watch and love.</p>
          <div className="movie-count">
            {movies.length} {movies.length === 1 ? "Movie" : "Movies"} Watched
          </div>
        </section>

        <section className="form-card">
          <h2>Add a Movie</h2>

          <form onSubmit={addMovie}>
            <label htmlFor="movieName">Movie Name</label>
            <input
              id="movieName"
              type="text"
              placeholder="Enter movie name..."
              value={movieName}
              onChange={(event) => setMovieName(event.target.value)}
            />

            <label htmlFor="review">Your Review</label>
            <textarea
              id="review"
              placeholder="What did you think about this movie?"
              value={review}
              onChange={(event) => setReview(event.target.value)}
              rows={3}
            />

            <label htmlFor="rating">Your Rating</label>
            <select
              id="rating"
              value={rating}
              onChange={(event) => setRating(Number(event.target.value))}
            >
              <option value="5">5 - Amazing!</option>
              <option value="4">4 - Great</option>
              <option value="3">3 - Good</option>
              <option value="2">2 - Okay</option>
              <option value="1">1 - Not for me</option>
            </select>

            <button className="add-button" type="submit">
              + Add Movie
            </button>
          </form>
        </section>

        <section className="movies-section">
          <h2>My Movies</h2>

          {movies.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🍿</div>
              <h3>No movies yet!</h3>
              <p>Add your first movie to start your collection.</p>
            </div>
          ) : (
            <div className="movie-list">
              {movies.map((movie) => (
                <article className="movie-card" key={movie.id}>
                  <div className="movie-top">
                    <div>
                      <h3>{movie.name}</h3>
                      <div
                        className="stars"
                        aria-label={`${movie.rating} out of 5 stars`}
                      >
                        {"⭐".repeat(movie.rating)}
                        <span className="rating-number"> {movie.rating}/5</span>
                      </div>
                    </div>

                    <button
                      className="remove-button"
                      type="button"
                      onClick={() => removeMovie(movie.id)}
                      aria-label={`Remove ${movie.name}`}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="review-box">
                    <strong>My Review</strong>
                    <p>{movie.review || "No review added."}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer>Made with 🍿 and ⭐</footer>
    </div>
  );
}

export default App;
