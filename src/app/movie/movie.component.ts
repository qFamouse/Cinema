import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../core/services";
import {Movie} from "../core/models/movies.model";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  movie: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      // @ts-ignore
      (data: {movie: Movie}) => {
        this.movie = data.movie;
        console.log(this.movie.date)
      })
  }

  ConvertMinutesToHHmm(minutes: number): string {
    return new Date(minutes * 60 * 1000).toISOString().substring(11, 16);
  }

}
