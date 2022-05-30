import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";


import {
  ApiService,
  BookingService,
  HallsService,
  MovieService,
  PlacesService,
  ReviewsService,
  SeancesService,
  TicketsService,
  UsersService
} from "./services";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpTokenInterceptor} from "./interceptors";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    BookingService,
    HallsService,
    MovieService,
    PlacesService,
    ReviewsService,
    SeancesService,
    TicketsService,
    UsersService
  ],
  declarations: []
})
export class CoreModule { }
