import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-schedule-booking',
  templateUrl: './schedule-booking.component.html',
  styleUrls: ['./schedule-booking.component.scss']
})
export class ScheduleBookingComponent implements OnInit {
  constructor() { }

  @Output() onModalClose = new EventEmitter();

  ngOnInit(): void {
  }

  onModalCloseClick(): void {
    this.onModalClose.emit();
  }
}
