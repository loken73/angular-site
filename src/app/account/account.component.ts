import { AppointmentService } from './../shared/appointment.service';
import { Appointment } from './../shared/appointment.model';
import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  userAppts: Appointment[];
  @ViewChild('overlay') overlay;
  userName: string;
  apptsExist: boolean;
  apptsNotExist: boolean;

  constructor(private apptService: AppointmentService, private renderer: Renderer2) { }

  ngOnInit() {
    this.apptService.getAppts()
      .subscribe(
        (res: any) => { this.userAppts = res.Appointments; this.userName = res.UserName; console.log(res); },
        err => {},
        () => { this.renderer.setStyle(this.overlay.nativeElement, 'display', 'none');
                console.log(this.userAppts);
                this.appointmentsExist();
              }
      );
  }

  appointmentsExist () {
    if (this.userAppts.length > 0) {
      this.apptsExist = true;
      this.apptsNotExist = false;
    } else {
      this.apptsNotExist = true;
      this.apptsExist = false;
    }
  }

}
