import { Movie } from '../types/movie';

const API_KEY = process.env.TMDB_API_KEY;
const AUTH_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNmFhNzE5Mzk2Y2E5MmZkNGU4OWVjMTI5MGZjZDgyMyIsInN1YiI6IjVmNWI5MDNmNzMxNGExMDAzNGRiN2M0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2GcQEOe17nrVmKFKDTfhGwicuvrmFj4iEUQcnHUZmtU'; // Use your auth token
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchMovies = async (endpoint: string): Promise<Movie[]> => {
  const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
};

export const fetchMovieDetail = async (id: number): Promise<Movie> => {
  const url = `${BASE_URL}/movie/${id}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  };

  const res = await fetch(url, options);
  if (!res.ok) {
    const data = await res.json();
    throw new Error(
      `Failed to fetch movie details for ID: ${id}: ${data.status_message}`
    );
  }
  return res.json();
};

export const fetchDiscoverMovies = (): Promise<Movie[]> =>
  fetchMovies('/discover/movie');
export const fetchNowPlayingMovies = (): Promise<Movie[]> =>
  fetchMovies('/movie/now_playing');
export const fetchPopularMovies = (): Promise<Movie[]> =>
  fetchMovies('/movie/popular');
export const fetchTopRatedMovies = (): Promise<Movie[]> =>
  fetchMovies('/movie/top_rated');
export const fetchUpcomingMovies = (): Promise<Movie[]> =>
  fetchMovies('/movie/upcoming');
