import {Component, Input, OnInit} from '@angular/core';
import {Seance} from "../../core/models/seance.model";
import {MovieService} from "../../core/services";

@Component({
  selector: 'app-schedule-seance',
  templateUrl: './schedule-seance.component.html',
  styleUrls: ['./schedule-seance.component.scss']
})
export class ScheduleSeanceComponent implements OnInit {
  @Input() seance: Seance;

  showAboutSeance : boolean = false;
  showModalBooking : boolean = false;
  poster: any;


  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getPosterById(this.seance.movie.id)
      .subscribe(poster => {
        this.createImageFromBlob(poster)
      })
  }

  convertDateToSeanceDate(date : Date) : string {
    return ("0" + date.getDate()).slice(-2) + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" +
      date.getFullYear() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.poster = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  handleModalOpenClose() {
    this.showModalBooking = !this.showModalBooking;
  }



}
