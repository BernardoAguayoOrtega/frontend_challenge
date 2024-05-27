// app/genres/GenrePageServer.tsx

import {
  fetchGenres,
  fetchMoviesByGenre,
  fetchMovieDetails,
} from '@/app/api/movie';
import { Movie } from '@/app/types/movie';
import GenrePageClient from './pageClient';

interface GenreMoviesData {
  genreId: number;
  genreName: string;
  movies: Movie[];
}

async function getGenresWithMovies(): Promise<GenreMoviesData[]> {
  const genres = await fetchGenres();
  const genresWithMovies = await Promise.all(
    genres.map(async (genre) => {
      const movies = await fetchMoviesByGenre(genre.id);
      const detailedMovies = await Promise.all(
        movies.map((movie) => fetchMovieDetails(movie.id))
      );
      return {
        genreId: genre.id,
        genreName: genre.name,
        movies: detailedMovies,
      };
    })
  );
  return genresWithMovies;
}

export default async function GenrePageServer() {
  const genresWithMovies = await getGenresWithMovies();

  return <GenrePageClient genresWithMovies={genresWithMovies} />;
}
