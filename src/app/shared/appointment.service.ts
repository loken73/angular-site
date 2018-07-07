import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from './appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  readonly rootUrl = 'http://localhost:61165/';
  token = localStorage.getItem('User_Token');
  access = new HttpHeaders({'Authorization': 'Bearer ' + this.token});
  constructor(private http: HttpClient) { }

  makeAppt(appt: Appointment) {
    const body: Appointment = {
      ApptDate: appt.ApptDate,
      Time: appt.Time,
      Notes: appt.Notes
    };
    return this.http.post(this.rootUrl + 'api/appointment', body, { headers: this.access });
  }

  getAppts() {
    /*console.log(this.token);
    console.log(this.access);*/
    return this.http.get(this.rootUrl + 'api/appointment/', { headers: this.access });
  }

  getAllAppts() {
    return this.http.get(this.rootUrl + 'api/appointment/all', { headers: this.access });
  }
}
