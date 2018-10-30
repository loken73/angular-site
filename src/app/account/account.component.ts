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

  constructor(private apptService: AppointmentService, private renderer: Renderer2,
              private el: ElementRef) { }

  ngOnInit() {
    this.apptService.getAppts()
      .subscribe(
        (res: any) => { this.userAppts = res; console.log(this.overlay.nativeElement); },
        err => {},
        () => { this.renderer.setStyle(this.overlay.nativeElement, 'display', 'none'); }
      );
  }

}
