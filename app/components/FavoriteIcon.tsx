'use client';

import { useEffect, useState } from 'react';
import { Movie } from '../types/movie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartPulse } from '@fortawesome/free-solid-svg-icons';
import { useFavorites } from '../Context/FavoritesContext';
import { useSession } from 'next-auth/react';

interface FavoriteIconProps {
  movie: Movie;
}

const FavoriteIcon: React.FC<FavoriteIconProps> = ({ movie }) => {
  const { data: session } = useSession();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(favorites.some((fav: Movie) => fav.id === movie.id));
  }, [favorites, movie.id]);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
    setIsFavorite(!isFavorite);
  };

  if (!session) return null;

  return (
    <button
      className="p-2 bg-black bg-opacity-50 rounded-full flex justify-center items-center"
      onClick={handleFavoriteClick}
    >
      <FontAwesomeIcon
        icon={isFavorite ? faHeartPulse : faHeart}
        size="lg"
        color={isFavorite ? 'red' : 'white'}
      />
    </button>
  );
};

export default FavoriteIcon;
