import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";


import {
  ApiService,
  BookingService,
  HallService,
  MovieService,
  PlaceService,
  ReviewService,
  SeanceService,
  TicketService,
  UserService,
  JwtService
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
    HallService,
    MovieService,
    PlaceService,
    ReviewService,
    SeanceService,
    TicketService,
    UserService,
    JwtService
  ],
  declarations: []
})
export class CoreModule { }
