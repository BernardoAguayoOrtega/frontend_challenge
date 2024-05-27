// app/genres/[id]/page.tsx

'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Movie } from '@/app/types/movie';
import { fetchMoviesByGenre } from '@/app/api/movie';
import MovieCard from '@/app/components/MovieCard';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

interface GenrePageProps {
  params: { genreId: string };
}

const GenrePage: React.FC<GenrePageProps> = ({ params }) => {
  const genreId = params.genreId;
  const searchParams = useSearchParams();
  const genreName = searchParams.get('genreName');

  const [results, setResults] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastMovieElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (genreId) {
      handleFetchMovies(parseInt(genreId, 10), 1);
    }
  }, [genreId]);

  const handleFetchMovies = async (genreId: number, pageNumber: number) => {
    setLoading(true);
    try {
      const { results: data, total_pages } = await fetchMoviesByGenre(
        genreId,
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
      console.error('Error fetching movies by genre:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && page < totalPages) {
        handleFetchMovies(parseInt(genreId, 10), page + 1);
      }
    });
    if (lastMovieElementRef.current) {
      observer.current.observe(lastMovieElementRef.current);
    }
  }, [results, loading, page, totalPages, genreId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{genreName} Movies</h1>
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

export default GenrePage;
