'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Genre, Movie } from '../types/movie';
import StarRating from './StarRating';
import Link from 'next/link';
import './Hero.css';

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

  const scrollToSlide = (index: number) => {
    setCurrent(index);
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
    <div className="hero-container relative w-full h-[70vh] md:h-[60vh] lg:h-[70vh] overflow-hidden mb-8">
      <div
        className="hero-content flex transition-transform duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {movies.map((movie, index) => (
          <div key={movie.id} className="hero-item relative w-full h-full">
            <Link href={`/movie/${movie.id}`}>
              <div className="hero--image-container">
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                  className="hero-image"
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-start justify-start p-4">
                  <div className="text-left text-white max-w-full md:max-w-2xl mt-8 md:mt-16 ml-4 md:ml-8">
                    <h1 className="text-2xl md:text-4xl font-bold mb-2 transition-opacity duration-300">
                      {movie.title}
                    </h1>
                    <div className="flex flex-wrap items-center mb-2">
                      <StarRating rating={movie.vote_average} />
                      <span className="ml-2 text-sm md:text-lg">
                        {movie.vote_average}
                      </span>
                      <span className="ml-2 text-sm md:text-lg">
                        ({movie.vote_count} Reviews)
                      </span>
                      <span className="ml-2 text-sm md:text-lg">
                        • {new Date(movie.release_date).getFullYear()}
                      </span>
                      <span className="ml-2 text-sm md:text-lg">
                        • {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}
                        min
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center mb-2 space-x-2">
                      {movie.genres.map((genre: Genre) => (
                        <span
                          key={genre.id}
                          className="bg-gray-800 text-white py-1 px-2 rounded text-xs md:text-sm"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm md:text-lg">{movie.overview}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="carousel-navigation absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {movies.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === current ? 'active' : ''}`}
            onClick={() => scrollToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
