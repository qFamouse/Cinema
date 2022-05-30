import {Movie} from "./movies.model";
import {Hall} from "./hall.model";

export interface Seance {
  id: number,
  hallId: number,
  hall: Hall
  movieId: number,
  movie: Movie
  date: Date,
  createdAt: Date,
  updatedAt: Date
}
