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
}
