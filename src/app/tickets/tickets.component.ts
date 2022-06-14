import { Component, OnInit } from '@angular/core';
import {BookingService, MovieService} from "../core/services";
import {ActiveBookingTickets} from "../core/models/booking.model";
import {Router} from "@angular/router";

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

          ticket.movie.poster = null; // Fix: for some reason, false image requests are being made. This is not related to subscribe

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

        this.activeTickets = activeTickets;
      })
  }

  cancelBooking(ticketId) {
    this.bookingService.cancelBooking(ticketId)
      .subscribe(success => {
        this.deleteActiveTicket(ticketId);
      })
  }

  deleteActiveTicket(ticketId) {
    let index = this.activeTickets.map(t => t.ticket.id).indexOf(ticketId);
    if (index >= 0) {
      this.activeTickets.splice(index, 1);
    }
  }
}
