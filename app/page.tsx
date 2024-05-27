// LandingPage.tsx

import {
  fetchDiscoverMovies,
  fetchMovieDetails,
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from './api/movie';
import Hero from './components/Hero';
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

  const detailedPopularMovies = await Promise.all(
    popularMovies.slice(0, 5).map((movie) => fetchMovieDetails(movie.id))
  );

  return (
    <main className="container mx-auto p-4 fade-in">
      <Hero movies={detailedPopularMovies} />
      <MovieSlider
        title="Discover Movies"
        movies={discoverMovies}
        to="/movies/discover"
      />
      <MovieSlider
        title="Now Playing"
        movies={nowPlayingMovies}
        to="/movies/now_playing"
      />
      <MovieSlider
        title="Popular"
        movies={popularMovies}
        to="/movies/popular"
      />
      <MovieSlider
        title="Top Rated"
        movies={topRatedMovies}
        to="/movies/top_rated"
      />
      <MovieSlider
        title="Upcoming"
        movies={upcomingMovies}
        to="/movies/upcoming"
      />
    </main>
  );
}
