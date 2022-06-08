import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ScheduleComponent} from "./schedule/schedule.component";
import {SoonComponent} from "./soon/soon.component";

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent
  },
  {
    path: 'soon',
    component: SoonComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
