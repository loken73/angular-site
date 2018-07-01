import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  dateNow = moment();
  currentMonth = this.dateNow.month();
  daysInMonth = this.dateNow.daysInMonth();
  startOfMonthDate = this.dateNow.startOf('M');
  startOfMonthWeekday = this.startOfMonthDate.day();
  calendarHeader = moment.months(this.dateNow.month()) + ' ' + this.dateNow.year();
  sqInCalendar = [];
  sqInCalendar2: any;
  dateChosen: string;

  ngOnInit() {
    const chartLength = this.sqInArray(this.currentMonth, this.startOfMonthWeekday, this.daysInMonth);
    this.sqInCalendar2 = this.squaresWithDate(chartLength);
  }

  sqInArray(month: number, startDate: number, monthLength: number): number {
    if (month !== 1 && ((startDate > 4 && monthLength === 31) || (startDate === 6 && monthLength === 30))) {
      return 42;
    } else {
      return 35;
    }

  }

  squaresWithDate (num: number): any {
    for (let i = 0; i < num; i++) {
      this.sqInCalendar.push(i);
    }

    const firstday = this.startOfMonthWeekday;
    const dateOfFirst = this.startOfMonthDate;
    const daysPlusIntroOffset = firstday + this.daysInMonth;

    const newArray = this.sqInCalendar.map(function(sq) {
      if (sq >= firstday && sq < daysPlusIntroOffset) {
        return {
          dayNumber: sq,
          date: moment(dateOfFirst).add(sq - firstday, 'day'),
          dateNumber: sq - firstday + 1,
        };
      } else {
        return {
          dayNumber: sq,
          date: '',
          dateNumber: ''};
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
    } else {
      this.dateChosen = moment.months(date.month()) + ' ' + date.date() + ', ' + date.year();
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
    if (date < moment().date()) {
      return true;
    } else {
      return false;
    }
  }

  dateNowNone(empty: string) {
    this.dateChosen = empty;
  }

}
