import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ScheduleComponent} from "./schedule/schedule.component";
import {SoonComponent} from "./soon/soon.component";
import {AboutComponent} from "./about/about.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {AuthComponent} from "./auth/auth.component";
import {ProfileComponent} from "./profile/profile.component";
import {NoAuthGuardService} from "./core/services/no-auth-guard.service";
import {AuthGuardService} from "./core/services/auth-guard.service";

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent
  },
  {
    path: 'soon',
    component: SoonComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contacts',
    component: ContactsComponent
  },
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [NoAuthGuardService]
  },
  {
    path: 'register',
    component: AuthComponent,
    canActivate: [NoAuthGuardService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile_edit',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
