import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { ToastModule } from 'primeng/toast';
import { BrowserModule } from '@angular/platform-browser';
import { WindowService } from './window.service';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { NavItemsComponent } from './nav-items/nav-items.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { BillingComponent } from './billing/billing.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { PastOrdersComponent } from './past-orders/past-orders.component';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { OrderListComponent } from './order-list/order-list.component';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    SidebarComponent,
    AppMenuitemComponent,
    NavItemsComponent,
    BillingComponent,
    PastOrdersComponent,
    OrderListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ToastModule,
    ProgressSpinnerModule,
    TabMenuModule,
    ButtonModule,
    TableModule,
    DialogModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    ProgressBarModule,
    CalendarModule,
    RadioButtonModule,
    AutoCompleteModule,
  ],
  providers: [
    WindowService
  ]
})
export class StaffModule { }
