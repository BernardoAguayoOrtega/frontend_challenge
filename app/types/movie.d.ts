export interface Genre {
  id: number;
  name: string;
}
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
  genres: Genre[];
}
