'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Movie } from '../types/movie';

interface HeroProps {
  movies: Movie[];
}

const Hero: React.FC<HeroProps> = ({ movies }) => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrent((prevCurrent) =>
      prevCurrent === movies.length - 1 ? 0 : prevCurrent + 1
    );
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(nextSlide, 5000);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [current]);

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
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-start justify-center p-4">
            <div className="text-center text-white max-w-2xl mt-16">
              <h1 className="text-4xl font-bold mb-2 transition-opacity duration-300">
                {movie.title}
              </h1>
              <p className="text-xl">
                Rating: {Math.round(movie.vote_average)}
              </p>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
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
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
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
