import { Movie, Video } from '../types/movie';

const API_KEY = process.env.TMDB_API_KEY;
const AUTH_TOKEN = process.env.TMDB_AUTH_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchMovies = async (endpoint: string): Promise<Movie[]> => {
  const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
};

const fetchMovieDetails = async (id: number): Promise<Movie> => {
  const res = await fetch(`${BASE_URL}/movie/${id}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch movie details for ID: ${id}`);
  }
  return res.json();
};

const fetchMovieVideos = async (id: number): Promise<Video[]> => {
  const res = await fetch(`${BASE_URL}/movie/${id}/videos`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch movie videos for ID: ${id}`);
  }
  const data = await res.json();
  return data.results;
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
export { fetchMovieDetails, fetchMovieVideos };
