'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Movie } from '@/app/types/movie';
import { fetchMoviesByType } from '@/app/api/movie';
import MovieCard from '@/app/components/MovieCard';

interface MoviesPageProps {
  params: {
    type: string;
  };
}

const MoviesPage: React.FC<MoviesPageProps> = ({ params }) => {
  const type = params.type;

  const [results, setResults] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastMovieElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (type) {
      handleFetchMovies(type, 1);
    }
  }, [type]);

  const handleFetchMovies = async (type: string, pageNumber: number) => {
    setLoading(true);
    try {
      const { results: data, total_pages } = await fetchMoviesByType(
        type,
        pageNumber
      );
      if (pageNumber === 1) {
        setResults(data);
      } else {
        setResults((prevResults) => [...prevResults, ...data]);
      }
      setTotalPages(total_pages);
      setPage(pageNumber);
    } catch (error) {
      console.error(`Error fetching ${type} movies:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && page < totalPages) {
        handleFetchMovies(type as string, page + 1);
      }
    });
    if (lastMovieElementRef.current) {
      observer.current.observe(lastMovieElementRef.current);
    }
  }, [results, loading, page, totalPages, type]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {type?.replace('_', ' ')} Movies
      </h1>
      {results.length === 0 && !loading && <div>No movies found</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.map((movie, index) => {
          if (results.length === index + 1) {
            return (
              <div ref={lastMovieElementRef} key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            );
          } else {
            return <MovieCard key={movie.id} movie={movie} />;
          }
        })}
      </div>
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default MoviesPage;
