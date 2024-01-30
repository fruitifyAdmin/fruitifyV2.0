import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService as AuthGuard } from './auth.service';
import { PublicModule } from './public/public.module';
import { MessageService } from 'primeng/api';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { StaffModule } from './staff/staff.module';
import { AngularFireModule } from '@angular/fire/compat';
import { WindowService } from './staff/window.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
// import { AngularFireModule } from '@angular/fire/compat/';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    PublicModule,
    StaffModule,
    AppRoutingModule,
    ProgressSpinnerModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCUSZuELhsjuI1XRJ95hmi3sC-_BG5lFhU",
      authDomain: "fruitify-de474.firebaseapp.com",
      projectId: "fruitify-de474",
      storageBucket: "fruitify-de474.appspot.com",
      messagingSenderId: "1034222982908",
      appId: "1:1034222982908:web:91fcaa342adc771544e979",
      measurementId: "G-90LHSTGEY4"
    }),
  ],
  providers: [
    AuthGuard,
    MessageService,
    WindowService,
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
