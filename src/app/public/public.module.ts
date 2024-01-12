import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { EventsLandingComponent } from './events/events-landing/events-landing.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    ComingSoonComponent,
    EventsLandingComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ]
})
export class PublicModule { }
