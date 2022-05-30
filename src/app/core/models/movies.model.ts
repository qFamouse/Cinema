export interface Movie {
  id: number,
  title: string,
  genre_id: number,
  duration: Date,
  age_limit: number,
  date: Date,
  country_id: number,
  director: string,
  actors: string,
  synopsis: string,
  start_rental_date: Date,
  end_rental_date: Date
}
