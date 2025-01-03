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

  getTimeString(time: Date) {
    const now = new Date();
    const diff = now.getTime() - new Date(time).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} ${days > 1 ? 'dni' : 'dzień'} temu`;
    } else if (hours > 0) {
      return `${hours} godz. temu`;
    } else if (minutes > 0) {
      return `${minutes} min. temu`;
    } else {
      return `przed chwilą`;
    }
  }

  getDurationInMinutes(startTime: Date, date: Date) {
    return Math.floor((date.getTime() - startTime.getTime()) / 60000);
  }

  getDurationInSeconds(startTime: Date, date: Date) {
    return Math.floor((date.getTime() - startTime.getTime()) / 1000);
  }
}
