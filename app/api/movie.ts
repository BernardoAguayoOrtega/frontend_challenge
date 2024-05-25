import { Movie } from '../types/movie';

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchMovies = async (endpoint: string): Promise<Movie[]> => {
  const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
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
