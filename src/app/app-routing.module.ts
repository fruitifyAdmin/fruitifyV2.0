import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './staff/login/login.component';
import { authGuard } from './auth.guard';
import { EventsLandingComponent } from './public/events/events-landing/events-landing.component';

const routes: Routes = [
  {
    path: 'staff',
    component: LoginComponent,
    canActivate: [authGuard]
  },
  {
    path: 'customer/eventshome',
    component: EventsLandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
