import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { ToastModule } from 'primeng/toast';
import { BrowserModule } from '@angular/platform-browser';
import { WindowService } from './window.service';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ToastModule
  ],
  providers: [
    WindowService
  ]
})
export class StaffModule { }
