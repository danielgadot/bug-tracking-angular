import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar.component';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    BrowserModule,
    CommonModule
  ],
  entryComponents: [CalendarComponent],
  exports: [CalendarComponent]
})
export class CalendarModule {}
