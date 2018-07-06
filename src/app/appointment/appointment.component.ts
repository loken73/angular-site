import { AppointmentService } from './../shared/appointment.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  @Input() public date: string;
  @Output() dateNone = new EventEmitter();
  apptTimes = [];

  constructor(private apptService: AppointmentService) { }

  ngOnInit() {
  }

  clicked(ev) {
    if (ev.target.id === 'submit') {
      this.date;
    }
    if (ev.target.id === 'modal-background' || ev.target.id === 'submit') {
      this.date = '';
      this.dateNone.emit(this.date);
    }
  }

}
