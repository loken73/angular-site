import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ServicesComponent } from './services/services.component';
import { LoginRegComponent } from './login-reg/login-reg.component';
import { UserService } from './shared/user.service';

const AppRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'appointment', component: CalendarComponent },
  { path: 'account', component: AccountComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'login-register', component: LoginRegComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CalendarComponent,
    AppointmentComponent,
    AccountComponent,
    HomeComponent,
    FooterComponent,
    ServicesComponent,
    LoginRegComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
