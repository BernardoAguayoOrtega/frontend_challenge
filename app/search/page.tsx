'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Movie } from '../types/movie';
import { searchMovies } from '../api/movie';
import MovieCard from '../components/MovieCard';
import withProtectedRoute from '../Hocs/withProtectedRoute';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('query') || '';

  const observer = useRef<IntersectionObserver | null>(null);
  const lastMovieElementRef = useRef<HTMLDivElement | null>(null);
  const typingTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (initialSearch) {
      setQuery(initialSearch);
      handleSearch(initialSearch, 1);
    }
  }, [initialSearch]);

  const handleSearch = async (searchQuery: string, pageNumber: number) => {
    if (searchQuery.trim()) {
      setLoading(true);
      try {
        const { results: data, total_pages } = await searchMovies(
          searchQuery,
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
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = window.setTimeout(() => {
      updateQueryParams(newQuery);
    }, 500); // 500ms delay
  };

  const updateQueryParams = (searchQuery: string) => {
    router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    handleSearch(searchQuery, 1);
  };

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && page < totalPages) {
        handleSearch(query, page + 1);
      }
    });
    if (lastMovieElementRef.current) {
      observer.current.observe(lastMovieElementRef.current);
    }
  }, [results, loading, page, totalPages, query]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Movies</h1>
      <div className="mb-4 relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a movie..."
          className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
        />
      </div>
      {results.length === 0 && !loading && query && <div>No movies found</div>}
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

export default withProtectedRoute(Search);
