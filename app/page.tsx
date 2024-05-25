import {
  fetchDiscoverMovies,
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from './api/movie';
import MovieSlider from './components/MoviesSlider';
import { Movie } from './types/movie';

interface MoviesData {
  discoverMovies: Movie[];
  nowPlayingMovies: Movie[];
  popularMovies: Movie[];
  topRatedMovies: Movie[];
  upcomingMovies: Movie[];
}

async function getMovies(): Promise<MoviesData> {
  const [
    discoverMovies,
    nowPlayingMovies,
    popularMovies,
    topRatedMovies,
    upcomingMovies,
  ] = await Promise.all([
    fetchDiscoverMovies(),
    fetchNowPlayingMovies(),
    fetchPopularMovies(),
    fetchTopRatedMovies(),
    fetchUpcomingMovies(),
  ]);

  return {
    discoverMovies,
    nowPlayingMovies,
    popularMovies,
    topRatedMovies,
    upcomingMovies,
  };
}

export default async function LandingPage() {
  const {
    discoverMovies,
    nowPlayingMovies,
    popularMovies,
    topRatedMovies,
    upcomingMovies,
  } = await getMovies();

  return (
    <main className="container mx-auto p-4 fade-in">
      <MovieSlider title="Discover Movies" movies={discoverMovies} />
      <MovieSlider title="Now Playing" movies={nowPlayingMovies} />
      <MovieSlider title="Popular" movies={popularMovies} />
      <MovieSlider title="Top Rated" movies={topRatedMovies} />
      <MovieSlider title="Upcoming" movies={upcomingMovies} />
    </main>
  );
}
