import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  get today() {
    return new Date(new Date().setHours(0, 0, 0, 0));
  }

  isToday(date: Date) {
    return date.toDateString() === this.today.toDateString();
  }
}
