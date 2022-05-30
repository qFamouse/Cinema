import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {Booking} from "../models/booking.model";

const booking : string = 'booking';

@Injectable()
export class BookingService {
  constructor(private apiService: ApiService) {}

  getAll(): Observable<Booking[]> {
    return this.apiService.get(`/${booking}/`);
  }

  getById(slug: any): Observable<Booking> {
    return this.apiService.get(`/${booking}/${slug}`);
  }
}
