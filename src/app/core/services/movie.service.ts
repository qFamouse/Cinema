import {ApiService} from "./api.service";
import {map, Observable} from "rxjs";
import {Movie} from "../models/movies.model";
import {Injectable} from "@angular/core";

const movies : string = 'movies';

@Injectable()
export class MovieService {

  constructor(private apiService: ApiService) {}

  getById(slug: any): Observable<Movie> {
    return this.apiService.get(`/${movies}/${slug}`);
  }

  getPosterById(slug: any): Observable<Blob> {
    return this.apiService.getImage(`/${movies}/posters/${slug}`);
  }

  getSoon(): Observable<Movie[]> {
    return this.apiService.get(`/${movies}/soon`)
      .pipe(map(movies => {
        movies.forEach(movie => {
          movie.poster = null;
          this.getPosterById(movie.id)
            .subscribe(poster => {
              let reader = new FileReader();
              reader.addEventListener("load", () => {
                movie.poster = reader.result;
              }, false);

              if (poster) {
                reader.readAsDataURL(poster);
              }
            })
        })

        return movies;
      }))
  }
}
