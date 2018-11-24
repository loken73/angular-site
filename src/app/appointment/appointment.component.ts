import { AppointmentService } from './../shared/appointment.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Appointment } from '../shared/appointment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  constructor(private fb: FormBuilder, private apptService: AppointmentService) { }

  @Input() public date: string;
  @Output() dateNone = new EventEmitter();
  @Output() apptDateSelected = new EventEmitter();

  // dateFormatted: string = this.date.format('MMMM DD YYYY');

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
    // Click submit button to trigger submitApplication
    if (ev.target.id === 'submit') {
      this.submitAppointment();
    }
    // Clicking either submit or off modal to clear selections
    if (ev.target.id === 'modal-background' || ev.target.id === 'submit') {
      this.date = null;
      this.dateNone.emit(this.date);
    }
  }

  submitAppointment() {
    // Binding submitAppt local variable to appointment selected
      const submitAppt: Appointment = {
        ApptDate: this.date,
        Time: this.appointmentForm.get('time').value,
        Notes: this.appointmentForm.get('notes').value
      };

      console.log(submitAppt);
      const isoDate = this.isoDateConvert(submitAppt.ApptDate);

      return this.apptService.makeAppt(submitAppt)
        .subscribe(
          res => {
            if (res === '200') {
              console.log('Appointment Date is:' + submitAppt.ApptDate);
              console.log(moment(isoDate));
              this.apptDateSelected.emit(isoDate);
            }
        });
  }

  isoDateConvert(input: string) {
    const dateSplit = input.split(' ');
    let numericMonth: string;

    switch (dateSplit[0]) {
      case 'January':
        numericMonth = '01';
        break;
      case 'February':
        numericMonth = '02';
        break;
      case 'March':
        numericMonth = '03';
        break;
      case 'April':
        numericMonth = '04';
        break;
      case 'May':
        numericMonth = '05';
        break;
      case 'June':
        numericMonth = '06';
        break;
      case 'July':
        numericMonth = '07';
        break;
      case 'August':
        numericMonth = '08';
        break;
      case 'September':
        numericMonth = '09';
        break;
      case 'October':
        numericMonth = '10';
        break;
      case 'November':
        numericMonth = '11';
        break;
      case 'December':
        numericMonth = '12';
        break;
    }

    return `${dateSplit[2]}-${numericMonth}-${dateSplit[1]}`;
  }

}
