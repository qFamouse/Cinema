import {ApiService} from "./api.service";
import {map, Observable} from "rxjs";
import {Movie} from "../models/movie.model";
import {Injectable} from "@angular/core";

const movies : string = 'movies';

@Injectable()
export class MovieService {

  constructor(private apiService: ApiService) {}

  getById(slug: number): Observable<Movie> {
    return this.apiService.get(`/${movies}/${slug}`)
  }
}
