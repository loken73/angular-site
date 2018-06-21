import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';

const AppRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'appointment', component: CalendarComponent },
  { path: 'account', component: AccountComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CalendarComponent,
    AppointmentComponent,
    AccountComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
