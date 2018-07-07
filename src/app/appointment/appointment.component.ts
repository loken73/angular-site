import { AppointmentService } from './../shared/appointment.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Appointment } from '../shared/appointment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  @Input() public date: string;
  @Output() dateNone = new EventEmitter();
  apptTimes: string[] = [
                          '8:00 AM',
                          '9:00 AM',
                          '10:00 AM',
                          '11:00 AM',
                          '12:00 PM',
                          '1:00 PM',
                          '2:00 PM',
                          '3:00 PM',
                          '4:00 PM',
                          '5:00 PM'
                        ];
  appt: Appointment;

  constructor(private fb: FormBuilder, private apptService: AppointmentService) { }

  appointmentForm: FormGroup;

  ngOnInit() {
    this.createAppointmentForm();
  }

  createAppointmentForm() {
    this.appointmentForm = this.fb.group({
      'time': [null, Validators.required],
      'notes': [null, Validators.required]
    });
  }

  clicked(ev) {
    if (ev.target.id === 'modal-background' || ev.target.id === 'submit') {
      this.date = '';
      this.dateNone.emit(this.date);
    }
    if (ev.target.id === 'submit') {
      this.submitAppointment();
    }
  }

  submitAppointment() {
      const submitAppt: Appointment = {
        ApptDate: this.date,
        Time: this.appointmentForm.get('time').value,
        Notes: this.appointmentForm.get('notes').value
      };

      return this.apptService.makeAppt(submitAppt).subscribe(res => { console.log(res); });
  }

}
