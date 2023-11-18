import { useEffect, useState } from "react";
import StarRating from "./StarRating";

const tempMovieData = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    },
    {
        imdbID: "tt0133093",
        Title: "The Matrix",
        Year: "1999",
        Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    },
    {
        imdbID: "tt6751668",
        Title: "Parasite",
        Year: "2019",
        Poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    },
];

const tempWatchedData = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        runtime: 148,
        imdbRating: 8.8,
        userRating: 10,
    },
    {
        imdbID: "tt0088763",
        Title: "Back to the Future",
        Year: "1985",
        Poster: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
];

const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
function Navbar({ children }) {
    return (
        <nav className="nav-bar">
            {" "}
            <Logo />
            {children}
        </nav>
    );
}
function Logo() {
    return (
        <div className="logo">
            <span role="img">🍿</span>
            <h1>usePopcorn</h1>
        </div>
    );
}
function Search({ query, setQuery }) {
    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    );
}
function NumRersults({ movies }) {
    return (
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    );
}
function Movie({ movie, handleSelectedId }) {
    return (
        <li onClick={() => handleSelectedId(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    );
}
function MovieList({ movies, handleSelectedId }) {
    return (
        <ul className="list list-movies">
            {movies.map((movie) => (
                <Movie movie={movie} key={movie.imdbID} handleSelectedId={handleSelectedId} />
            ))}
        </ul>
    );
}
function Box({ children }) {
    const [isOpen, setIsOpen1] = useState(true);

    return (
        <div className="box">
            <button className="btn-toggle" onClick={() => setIsOpen1((open) => !open)}>
                {isOpen ? "–" : "+"}
            </button>
            {isOpen && children}
        </div>
    );
}
function WatchedSummry({ watched }) {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));
    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                </p>
            </div>
        </div>
    );
}
function WatchedMovie({ movie }) {
    return (
        <li>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>
            </div>
        </li>
    );
}
function WatchedMovieList({ watched }) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie movie={movie} key={movie.imdbID} />
            ))}
        </ul>
    );
}

function Main({ children }) {
    return <main className="main">{children}</main>;
}
function Loading() {
    return <p className="loader">Loading...</p>;
}
function ErrShow({ err }) {
    return (
        <p className="error">
            <span>⛔</span>
            {err}
        </p>
    );
}
const KEY = "f84fc31d";

function DetaileFilm({ idSelect, handleBackClick }) {
    const [movie, setMovie] = useState({});
    useEffect(
        function () {
            async function getMovie(id) {
                console.log(id);
                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${id}`);
                const data = await res.json();

                setMovie(data);
            }
            getMovie(idSelect);
        },
        [idSelect]
    );
    console.log(movie);
    return (
        <div className="details">
            
            <header>
                <button className="btn-back" onClick={handleBackClick}>
                    &larr;
                </button>
                <img src={movie.Poster} alt="jgj" />
                <div className="details-overview">
                    <h2>{movie.Title}</h2>
                    <p>
                        {movie.Released} &bull; {movie.Runtime}
                    </p>
                    <p>{movie.Genre}</p>
                    <p>
                        <span>⭐</span>
                        {movie.imdbRating} Imdb Rating
                    </p>
                </div>
            </header>
            
            <section>
                <p>
                    <em>{movie.Plot}</em>
                </p>
                <p>Starring {movie.Actors}</p>
                <p>Directed By {movie.Director}</p>
            </section>
        </div>
    );
}
export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState(tempWatchedData);
    const [isLoading, setIsloading] = useState(false);
    const [isErr, setIsErr] = useState("");
    const [query, setQuery] = useState("love");
    const [selectedId, setSelectedId] = useState(null);
    const tempQuery = "Interstellar";
    useEffect(
        function () {
            async function getData() {
                setIsErr("");
                setIsloading(true);
                try {
                    const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
                    const data = await res.json();
                    if (!res.ok) throw new Error("اینترنت قطع است ");
                    if (data.Response === "False") {
                        throw new Error("Movie not found!");
                    }
                    setMovies(data.Search);
                } catch (error) {
                    console.log(error.message);
                    setIsErr(error.message);
                } finally {
                    setIsloading(false);
                }
            }
            if (query.length < 3) {
                setIsErr("");
                setMovies([]);
                return;
            }
            getData();
        },
        [query]
    );
    // useEffect(function(){
    //     async function fetchMovie(){

    //         fetch()
    //     }
    // })
    function handleSelectedId(id) {
        setSelectedId((selectedId) => (selectedId === id ? null : id));
    }
    function handleBackClick() {
        setSelectedId(null);
    }
    return (
        <>
            <Navbar>
                <Search query={query} setQuery={setQuery} />
                <NumRersults movies={movies} />
            </Navbar>
            <Main>
                <Box>
                    {isLoading && <Loading />}
                    {!isLoading && !isErr && (
                        <MovieList movies={movies} handleSelectedId={handleSelectedId} />
                    )}
                    {isErr && <ErrShow err={isErr} />}
                </Box>
                <Box>
                    {selectedId ? (
                        <DetaileFilm
                            idSelect={selectedId}
                            movies1={movies}
                            handleBackClick={handleBackClick}
                        />
                    ) : (
                        <>
                            <WatchedSummry watched={watched} />
                            <WatchedMovieList watched={watched} />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}
