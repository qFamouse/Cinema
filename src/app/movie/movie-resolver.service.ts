import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Movie} from "../core/models/movies.model";
import {MovieService} from "../core/services";
import {catchError, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MovieResolver implements Resolve<Movie> {
  constructor(
    private movieService: MovieService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.movieService.getById(route.params['slug'])
      .pipe(catchError( err => {
        return this.router.navigateByUrl('/')
      }));
  }
}
