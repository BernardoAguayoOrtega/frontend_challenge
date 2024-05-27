// app/genres/GenrePageServer.tsx

import {
  fetchGenres,
  fetchMoviesByGenre,
  fetchMovieDetails,
} from '@/app/api/movie';
import MovieSlider from '@/app/components/MoviesSlider';
import { Movie } from '@/app/types/movie';
import Link from 'next/link';

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
        movies.results.map((movie) => fetchMovieDetails(movie.id))
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

  return (
    <main className="container mx-auto p-4 fade-in">
      {genresWithMovies.map(({ genreId, genreName, movies }) => (
        <div key={genreId} className="mb-8">
          <MovieSlider
            title={genreName}
            movies={movies}
            to={`/genres/${genreId}`}
          />
        </div>
      ))}
    </main>
  );
}
