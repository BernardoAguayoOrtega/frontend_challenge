'use client';

import { useState, useEffect, useRef } from 'react';
import { Movie } from '../types/movie';
import MovieCard from '../components/MovieCard';
import withProtectedRoute from '../Hocs/withProtectedRoute';
import { useFavorites } from '../Context/FavoritesContext';

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();
  const [results, setResults] = useState<Movie[]>(favorites);

  useEffect(() => {
    setResults(favorites);
  }, [favorites]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Favorite Movies</h1>
      {results.length === 0 && <div>No favorite movies found</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default withProtectedRoute(Favorites);
