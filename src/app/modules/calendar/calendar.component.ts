import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dg-calendar',
  templateUrl: `./calendar.html`
})
export class CalendarComponent implements OnInit {

  days = [
    {
      id: 1,
      tasks: [],
      name: 'Sunday'
    },    {
      id: 2,
      tasks: ['errands', 'Workout Top', 'Yon?'],
      name: '⏰ Monday'
    },    {
      id: 3,
      tasks: [],
      name: 'Tuesday'
    },    {
      id: 4,
      tasks: ['Workout Bottom'],
      name: 'Wednesday'
    },    {
      id: 5,
      tasks: [],
      name: 'Thursday'
    },    {
      id: 6,
      tasks: ['Cleaning house', 'Soccer?', 'Friends?', 'Family'],
      name: 'Friday'
    },    {
      id: 7,
      tasks: ['Trading - prepare for week', 'Work - plan week'],
      name: 'Saturday'
    }
    ];
  constructor() {}

  async ngOnInit() {
    console.log('calendar :: ', this);
  }
}
