import {Component, EventEmitter, Input, OnInit, Output, Renderer2} from '@angular/core';
import {Seance} from "../../core/models/seance.model";
import {BookingService, HallService, PlaceService, TicketService, UserService} from "../../core/services";
import {Hall} from "../../core/models/hall.model";
import { Place } from 'src/app/core/models/place.service';
import {Ticket} from "../../core/models/ticket.model";
import {tick} from "@angular/core/testing";
import {Router} from "@angular/router";

@Component({
  selector: 'app-schedule-booking',
  templateUrl: './schedule-booking.component.html',
  styleUrls: ['./schedule-booking.component.scss']
})
export class ScheduleBookingComponent implements OnInit {
  maxSelectedSeat: number = 5;
  @Input() seance: Seance;
  selectedPlaces: Array<number> = [];
  selectedCost: number = 0;
  isAuthenticated: boolean;
  tickets: Ticket[]
  hall: Hall;
  places: Place[];

  @Output() onModalClose = new EventEmitter();
  onModalCloseClick(): void {
    this.onModalClose.emit();
  }

  constructor(
    private hallService: HallService,
    private placeService: PlaceService,
    private ticketsService: TicketService,
    private bookingService: BookingService,
    private renderer: Renderer2,
    private userService: UserService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.userService.isAuthenticated
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated
      });

    this.hallService.getById(this.seance.hallId)
      .subscribe(hall => {
        this.hall = hall;
      })

    this.placeService.getById(this.seance.hallId)
      .subscribe(places => {
        this.places = places;
      })

    this.ticketsService.getBySeanceId(this.seance.id)
      .subscribe(tickets => {
        this.tickets = tickets;
      })
  }

  getArrayWithSize(size: number): number[] {
    return Array.from({length: size}, (_, i) => i + 1);
  }

  getPlace(row: number, seat: number): Place | undefined {
    return this.places?.find(p => p.row === row && p.seat === seat);
  }

  isVip(row: number, seat: number) {
    return this.getPlace(row, seat)?.isVip;
  }

  getTicket(placeId: number): Ticket | undefined {
    return this.tickets?.find(t => t.placeId === placeId);
  }

  isOccupied(row: number, seat: number): boolean {
    let place = this.getPlace(row, seat);
    if (place)
    {
      let ticket = this.getTicket(place.id);
      return ticket?.isOccupied ?? false;
    }
    return false;
  }

  selectSeat(event, row: number, seat: number) {
    const occupied = 'booking__seat_occupied';
    const selected = 'booking__seat_selected';
    const vip      = 'booking__seat_vip';

    const elementClassList = event.target.classList;

    if (elementClassList.contains(occupied))
    { // if place is occupied then return
      return;
    }

    const place = this.getPlace(row, seat);

    if (place) {
      if (elementClassList.contains(selected))
      {
        this.renderer.removeClass(event.target, 'booking__seat_selected');
        let selectedIndex = this.selectedPlaces.indexOf(place.id);
        if (selectedIndex >= 0) {
          this.selectedPlaces.splice(selectedIndex, 1);

          this.selectedCost = Math.round((this.selectedCost - this.getTicket(place.id)!.cost) * 20) / 20;
        }
      }
      else if (this.selectedPlaces.length >= this.maxSelectedSeat) {
        return;
      }
      else
      {
        this.renderer.addClass(event.target, 'booking__seat_selected');
        this.selectedPlaces.push(place.id);
        this.selectedCost = Math.round((this.selectedCost + this.getTicket(place.id)!.cost) * 20) / 20;
      }
    }
  }

  booking() {
    if (!this.isAuthenticated) {
      this.router.navigateByUrl('/login');
    }
    else {
      if (this.selectedPlaces.length > 0) {
        this.selectedPlaces.forEach(place => {
          let ticket = this.getTicket(place);
          if (ticket?.id) {
            this.bookingService.book(ticket.id)
              .subscribe(book => {
                console.log(book);
              })
          }
        })
      }
    }
  }

}
