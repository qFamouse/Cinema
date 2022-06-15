import { Component, OnInit } from '@angular/core';
import {MovieService} from "../core/services";
import {Movie} from "../core/models/movies.model";

@Component({
  selector: 'app-soon',
  templateUrl: './soon.component.html',
  styleUrls: ['./soon.component.scss']
})
export class SoonComponent implements OnInit {
  movies: Movie[]

  constructor(
    private movieService: MovieService,
  ) { }

  ngOnInit(): void {
    this.movieService.getSoon()
      .subscribe(movies => {
        this.movies = movies
      });
  }

  getDayMothInString(date: Date): string {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    date = new Date(date);
    let day = date.getDate();
    let month = date.getMonth();
    return `${day} ${monthNames[month]}`
  }

}
