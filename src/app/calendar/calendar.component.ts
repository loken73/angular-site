import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  // Date object representing current date
  dateNow = moment();
  // Month of dateNow in number form
  currentMonth = this.dateNow.month();
  // Total days in current month
  daysInMonth = this.dateNow.daysInMonth();
  // The Date of the first day of month
  startOfMonthDate = this.dateNow.startOf('M');
  // Day of the week the start of the month is on
  startOfMonthWeekday = this.startOfMonthDate.day();
  calendarHeader = this.dateNow.format('MMMM YYYY');
  sqInCalendar = [];
  sqInCalendar2: any;
  dateChosen: string;
  dateConfirmed: moment.Moment;


  ngOnInit() {
    const chartLength = this.sqInArray(this.currentMonth, this.startOfMonthWeekday, this.daysInMonth);
    this.sqInCalendar2 = this.squaresWithDate(chartLength);
    console.log(this.currentMonth);
  }

  // Function returns amount of total squares in the grid of month
  sqInArray(month: number, startDate: number, monthLength: number): number {
    if (month !== 1 && ((startDate > 4 && monthLength === 31) || (startDate === 6 && monthLength === 30))) {
      return 42;
    } else {
      return 35;
    }

  }

  // Creates array with total number of squares including epmty ones 35 or 42
  squaresWithDate (num: number): any {
    for (let i = 0; i < num; i++) {
      this.sqInCalendar.push(i);
    }

    // Saving local copies of relevant data to not change the class variables

    // Returns 0 (Sunday)-6(Saturday) depending what day current month starts on
    const firstday = this.startOfMonthWeekday;
    // Date object of the first day in current month
    const dateOfFirst = this.startOfMonthDate;
    // Sets the number of last day of the month in chart that should be numbered
    const daysPlusIntroOffset = firstday + this.daysInMonth;

    const newArray = this.sqInCalendar.map(function(sq) {
      // Checks if the empty square is inside the range of the days of the month
      if (sq >= firstday && sq < daysPlusIntroOffset) {
          return {
            // number of square in total chart
            dayNumber: sq,
            // Adding to actual date used
            date: moment(dateOfFirst).add(sq - firstday, 'day'),
            // number of day in the month
            dateNumber: sq - firstday + 1,
            // Boolean showing whether that date was selected and submitted for the appointment
            selectedDate: false
          };
        // The else would happen if the square is not in the range of the current month
      } else {
          return {
            dayNumber: sq,
            date: '',
            dateNumber: ''
          };
      }
    });
    return newArray;
  }

  nextMonth() {
    const newMonthStart = this.startOfMonthDate.add(1, 'month');
    this.currentMonth = newMonthStart.month();
    this.daysInMonth = newMonthStart.daysInMonth();
    this.startOfMonthDate = newMonthStart;
    this.startOfMonthWeekday = this.startOfMonthDate.day();
    this.sqInCalendar = [];
    this.calendarHeader = moment.months(newMonthStart.month()) + ' ' + newMonthStart.year();
    const chartLength = this.sqInArray(this.currentMonth, this.startOfMonthWeekday, this.daysInMonth);
    this.sqInCalendar2 = this.squaresWithDate(chartLength);
  }

  previousMonth() {
    const newMonthStart = this.startOfMonthDate.subtract(1, 'month');
    this.currentMonth = newMonthStart.month();
    this.daysInMonth = newMonthStart.daysInMonth();
    this.startOfMonthDate = newMonthStart;
    this.startOfMonthWeekday = newMonthStart.day();
    this.sqInCalendar = [];
    this.calendarHeader = moment.months(newMonthStart.month()) + ' ' + newMonthStart.year();
    const chartLength = this.sqInArray(this.currentMonth, this.startOfMonthWeekday, this.daysInMonth);
    this.sqInCalendar2 = this.squaresWithDate(chartLength);
  }

  datePicked (date: moment.Moment) {
    if (!date) {
      this.dateChosen = '';
      return null;
    }
    if (date.date() < moment().date()) {
      this.dateChosen = '';
      return null;
    } else {
      this.dateChosen = date.format('MMMM DD YYYY');
    }
    console.log(this.dateChosen);
  }

  displayPreviousChevron () {
    if (this.currentMonth === moment().month() && this.dateNow.year() === moment().year()) {
      return false;
    } else {
      return true;
    }
  }

  beforeCurrentDate (date) {
    if (date < moment().date() && this.dateNow.month() === moment().month()) {
      return true;
    } else {
      return false;
    }
  }

  dateNowNone(empty: string) {
    this.dateChosen = null;
  }

  apptConfirmed($event: string) {
    const dateConfirmedMoment = moment($event);

    this.dateConfirmed = dateConfirmedMoment;
  }

}
