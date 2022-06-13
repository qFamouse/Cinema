import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../core/services";
import {Movie} from "../core/models/movies.model";
import { DomSanitizer } from '@angular/platform-browser';

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
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      // @ts-ignore
      (data: {movie: Movie}) => {
        this.movie = data.movie;
        console.log(this.movie)
      })


    console.log(this.movie.youtube.match('(?<==).+')![0])
  }

  ConvertMinutesToHHmm(minutes: number): string {
    return new Date(minutes * 60 * 1000).toISOString().substring(11, 16);
  }

  getYoutubeURL() {
    let url = `https://www.youtube.com/embed/${this.movie.youtube.match('(?<==).+')![0]}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
