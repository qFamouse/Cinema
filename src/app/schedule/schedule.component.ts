import { Component, OnInit } from '@angular/core';
import {HallService, MovieService, SeanceService} from "../core/services";
import {Movie} from "../core/models/movies.model";
import {Hall} from "../core/models/hall.model";
import {Seance} from "../core/models/seance.model";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  options : { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  halls : Array<Hall> = [];
  seances: Array<Seance> = []

  constructor(
    private hallService: HallService,
    private movieService: MovieService,
    private seanceService : SeanceService
  ) { }

  ngOnInit(): void {
    let now = new Date();
    let afterWeek = new Date(Date.now() + 6.048e+8);
    this.seanceService.getRepertoire(now, afterWeek).subscribe(
      halls => {
        this.halls = halls;
      }
    )
  }
}
