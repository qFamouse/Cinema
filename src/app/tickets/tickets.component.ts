import { Component, OnInit } from '@angular/core';
import {BookingService, MovieService} from "../core/services";
import {ActiveBookingTickets} from "../core/models/booking.model";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  activeTickets: ActiveBookingTickets[];

  constructor(
    private bookingService: BookingService,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.bookingService.getActiveTickets()
      .subscribe(activeTickets => {
        activeTickets.forEach(ticket => {
          this.movieService.getPosterById(ticket.movie.id)
            .subscribe(poster => {
              let reader = new FileReader();
              reader.addEventListener("load", () => {
                ticket.movie.poster = reader.result;
              }, false);

              if (poster) {
                reader.readAsDataURL(poster);
              }
            })

          ticket.seance.date = new Date(ticket.seance.date);
        })

        console.log(this.activeTickets);
        this.activeTickets = activeTickets;
      })
  }
}
