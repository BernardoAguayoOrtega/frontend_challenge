import { fetchMovieDetails, fetchMovieVideos } from '@/app/api/movie';
import StarRating from '@/app/components/StarRating';
import VideosSlider from '@/app/components/VideosSlider';
import { Movie, Video } from '@/app/types/movie';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import FavoriteIcon from '@/app/components/FavoriteIcon';

interface MovieDetailPageProps {
  params: {
    id: string;
  };
}

export default async function MovieDetailPage({
  params,
}: MovieDetailPageProps) {
  const movieId = parseInt(params.id, 10);

  let movie: Movie | null = null;
  let videos: Video[] = [];
  let error = null;

  try {
    movie = await fetchMovieDetails(movieId);
    videos = await fetchMovieVideos(movieId);
  } catch (err) {
    error = 'Failed to fetch movie details';
  }

  if (!movie) {
    notFound();
  }

  return <MovieDetail movie={movie} videos={videos} />;
}

const MovieDetail: React.FC<{ movie: Movie; videos: Video[] }> = ({
  movie,
  videos,
}) => {
  const officialVideos = videos.filter((video) => video.official);

  return (
    <div className="container mx-auto p-4 text-white">
      <div className="relative w-full h-[70vh] mb-8">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          layout="fill"
          objectFit="cover"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <FavoriteIcon movie={movie} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={750}
            className="rounded-lg"
          />
        </div>
        <div className="w-full md:w-2/3 md:ml-8">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
            <div className="flex items-center mb-2">
              <StarRating rating={movie.vote_average} />
              <span className="ml-2">{movie.vote_average}</span>
              <span className="ml-2">({movie.vote_count} Reviews)</span>
              <span className="ml-2">
                • {new Date(movie.release_date).getFullYear()}
              </span>
              <span className="ml-2">
                • {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min
              </span>
            </div>
            <div className="flex flex-wrap mb-2 space-x-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-800 text-white py-1 px-2 rounded"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <p>{movie.overview}</p>
          </div>
          <VideosSlider videos={officialVideos} />
        </div>
      </div>
    </div>
  );
};
