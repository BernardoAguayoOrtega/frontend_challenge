import { Movie, Video } from '../types/movie';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const AUTH_TOKEN = process.env.NEXT_PUBLIC_TMDB_AUTH_TOKEN;
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

const searchMovies = async (
  query: string,
  page: number = 1
): Promise<{ results: Movie[]; total_pages: number }> => {
  const res = await fetch(
    `${BASE_URL}/search/movie?query=${query}&page=${page}`,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error(`Failed to search movies for query: ${query}`);
  }
  const data = await res.json();
  return { results: data.results, total_pages: data.total_pages };
};

const fetchGenres = async (): Promise<{ id: number; name: string }[]> => {
  const res = await fetch(`${BASE_URL}/genre/movie/list`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch genres');
  }
  const data = await res.json();
  return data.genres;
};

const fetchMoviesByGenre = async (
  genreId: number,
  page: number = 1
): Promise<{ results: Movie[]; total_pages: number }> => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?with_genres=${genreId}&page=${page}`,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    }
  );
  const data = await res.json();
  return { results: data.results, total_pages: data.total_pages };
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
export {
  fetchMovieDetails,
  fetchMovieVideos,
  searchMovies,
  fetchGenres,
  fetchMoviesByGenre,
};
