'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Genre, Movie } from '../types/movie';
import StarRating from './StarRating';

interface HeroProps {
  movies: Movie[];
}

const Hero: React.FC<HeroProps> = ({ movies }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prevCurrent) =>
      prevCurrent === movies.length - 1 ? 0 : prevCurrent + 1
    );
  };

  useEffect(() => {
    const timeoutRef = setTimeout(nextSlide, 5000);
    return () => {
      clearTimeout(timeoutRef);
    };
  }, [current]);

  const movie = movies[current];
  if (!movie) return null;

  return (
    <div className="relative w-full h-[70vh] overflow-hidden mb-8">
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-start justify-start p-4">
            <div className="text-left text-white max-w-2xl mt-16 ml-8">
              <h1 className="text-4xl font-bold mb-2 transition-opacity duration-300">
                {movie.title}
              </h1>
              <div className="flex items-center mb-2">
                <StarRating rating={movie.vote_average} />
                <span className="ml-2 text-lg">{movie.vote_average}</span>
                <span className="ml-2 text-lg">
                  ({movie.vote_count} Reviews)
                </span>
                <span className="ml-2 text-lg">
                  • {new Date(movie.release_date).getFullYear()}
                </span>
                <span className="ml-2 text-lg">
                  • {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min
                </span>
              </div>
              <div className="flex items-center mb-2 space-x-2">
                {movie.genres.map((genre: Genre) => (
                  <span
                    key={genre.id}
                    className="bg-gray-800 text-white py-1 px-2 rounded"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              <p className="text-lg">{movie.overview}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() =>
            setCurrent((prevCurrent) =>
              prevCurrent === 0 ? movies.length - 1 : prevCurrent - 1
            )
          }
          className="p-4 bg-gray-800 bg-opacity-50 text-white rounded-full focus:outline-none hover:bg-gray-700"
        >
          &#8249;
        </button>
        <button
          onClick={() =>
            setCurrent((prevCurrent) =>
              prevCurrent === movies.length - 1 ? 0 : prevCurrent + 1
            )
          }
          className="p-4 bg-gray-800 bg-opacity-50 text-white rounded-full focus:outline-none hover:bg-gray-700"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Hero;
