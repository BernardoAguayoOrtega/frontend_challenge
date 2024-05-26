import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link href={`/movie/${movie.id}`} passHref>
      <div className="min-w-[200px] flex-shrink-0 relative transform transition-transform duration-300 hover:scale-105">
        <div className="relative w-full h-80 movie-card">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            layout="fill"
            objectFit="cover"
            className="rounded"
          />
          <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 transition-opacity duration-300 flex items-center justify-center text-white p-4 rounded overflow-hidden hover:opacity-100 cursor-pointer">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold">{movie.title}</h3>
              <p className="text-sm max-h-24 overflow-hidden">
                {movie.overview}
              </p>
              <p className="text-xs">Release Date: {movie.release_date}</p>
            </div>
          </div>
        </div>
        <h3 className="text-sm mt-2 text-center text-white">{movie.title}</h3>
      </div>
    </Link>
  );
};

export default MovieCard;
