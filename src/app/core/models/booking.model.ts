import { Hall } from "./hall.model";
import {Ticket} from "./ticket.model";
import {Place} from "./place.service";
import {Movie} from "./movies.model";
import {Seance} from "./seance.model";

export interface Booking {
  id: number,
  userId: number,
  ticketId: number,
  createdAt: Date
}

export interface ActiveBookingTickets extends Booking {
  ticket: Ticket,
  hall: Hall,
  place: Place,
  movie: Movie,
  seance: Seance
}
