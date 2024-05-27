'use client';

import { useRef } from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../types/movie';
import Link from 'next/link';

interface MovieSliderProps {
  movies: Movie[];
  title: string;
  to: string;
}

const MovieSlider: React.FC<MovieSliderProps> = ({ movies, title, to }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-8 relative">
      <div className="flex justify-between items-center mb-4">
        <Link href={to}>
          <h2 className="text-2xl font-bold text-white cursor-pointer">
            {title}
          </h2>
        </Link>
        <Link href={to}>
          <span className="text-white text-sm cursor-pointer">See More</span>
        </Link>
      </div>
      <div className="relative group">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-gray-800 bg-opacity-50 text-white rounded-full focus:outline-none hover:bg-gray-700 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        >
          &#8249;
        </button>
        <div
          ref={sliderRef}
          className="flex overflow-x-scroll scrollbar-hide space-x-4 p-2"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-gray-800 bg-opacity-50 text-white rounded-full focus:outline-none hover:bg-gray-700 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default MovieSlider;
