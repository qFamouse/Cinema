export interface Review {
  id: number,
  movieId: number,
  userId: number,
  rating: number,
  review: string,
  updatedAt: Date,
  createdAt: Date
}
