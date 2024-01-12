import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService as AuthGuard } from './auth.service';
import { PublicModule } from './public/public.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PublicModule,
    AppRoutingModule,
  ],
  providers: [
    AuthGuard,
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
