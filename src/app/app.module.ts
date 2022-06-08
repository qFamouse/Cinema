import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ScheduleComponent } from './schedule/schedule.component';
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import { ScheduleSeanceComponent } from './schedule/schedule-seance/schedule-seance.component';
import { ScheduleBookingComponent } from './schedule/schedule-booking/schedule-booking.component';
import { SoonComponent } from './soon/soon.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ScheduleComponent,
    ScheduleSeanceComponent,
    ScheduleBookingComponent,
    SoonComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
