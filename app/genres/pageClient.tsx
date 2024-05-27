// app/genres/GenrePageClient.tsx

'use client';

import MovieSlider from '@/app/components/MoviesSlider';
import { Movie } from '@/app/types/movie';
import withProtectedRoute from '../Hocs/withProtectedRoute';

interface GenreMoviesData {
  genreId: number;
  genreName: string;
  movies: Movie[];
}

interface GenrePageClientProps {
  genresWithMovies: GenreMoviesData[];
}

const GenrePageClient: React.FC<GenrePageClientProps> = ({
  genresWithMovies,
}) => {
  return (
    <main className="container mx-auto p-4 fade-in">
      {genresWithMovies.map(({ genreId, genreName, movies }) => (
        <div key={genreId} className="mb-8">
          <MovieSlider
            to={`/genres/${genreId}?genreName=${genreName}`}
            title={genreName}
            movies={movies}
          />
        </div>
      ))}
    </main>
  );
};

export default withProtectedRoute(GenrePageClient);
