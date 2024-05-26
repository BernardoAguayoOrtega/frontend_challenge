'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { fetchMovieDetail } from '../api/movie';
import StarRating from './StarRating';
import { Genre, Movie } from '../types/movie';


interface HeroProps {
  movies: Movie[];
}

const Hero: React.FC<HeroProps> = ({ movies }) => {
  const [current, setCurrent] = useState(0);
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrent((prevCurrent) =>
      prevCurrent === movies.length - 1 ? 0 : prevCurrent + 1
    );
  };

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        const details = await fetchMovieDetail(movies[current].id);
        setMovieDetails(details);
      } catch (error) {
        console.error(error);
      }
    };

    loadMovieDetails();

    timeoutRef.current = setTimeout(nextSlide, 5000);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [current, movies]);

  if (!movieDetails) return null;

  const {
    title,
    backdrop_path,
    vote_average,
    vote_count,
    release_date,
    overview,
    runtime,
    genres,
  } = movieDetails;

  return (
    <div className="relative w-full h-[70vh] overflow-hidden mb-8">
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-start justify-start p-4">
            <div className="text-left text-white max-w-2xl mt-16 ml-8">
              <h1 className="text-4xl font-bold mb-2 transition-opacity duration-300">
                {title}
              </h1>
              <div className="flex items-center mb-2">
                <StarRating rating={vote_average} />
                <span className="ml-2 text-lg">{vote_average}</span>
                <span className="ml-2 text-lg">({vote_count} Reviews)</span>
                <span className="ml-2 text-lg">
                  • {release_date.split('-')[0]}
                </span>
                <span className="ml-2 text-lg">
                  • {Math.floor(runtime / 60)}h {runtime % 60}min
                </span>
              </div>
              <div className="flex items-center mb-2 space-x-2">
                {genres.map((genre: Genre) => (
                  <span
                    key={genre.id}
                    className="bg-gray-800 text-white py-1 px-2 rounded"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              <p className="text-lg">{overview}</p>
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
          className="p-2 bg-gray-800 bg-opacity-50 text-white rounded-full focus:outline-none hover:bg-gray-700"
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
          className="p-2 bg-gray-800 bg-opacity-50 text-white rounded-full focus:outline-none hover:bg-gray-700"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Hero;
