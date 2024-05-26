export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
}

export interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  runtime: number;
  genres: Genre[];
  overview: string;
}
