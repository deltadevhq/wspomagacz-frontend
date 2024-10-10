import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { IonButton, IonIcon, IonText } from '@ionic/angular/standalone';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

export interface HighlightedDate {
  date: Date;
  color: string;
}

@Component({
  standalone: true,
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  imports: [AsyncPipe, NgIf, NgForOf, IonButton, IonIcon, IonText],
})
export class CalendarComponent implements OnInit {
  @Input() highlightedDates: HighlightedDate[] = [];

  @Output() selectedDateChange = new EventEmitter<Date>();

  readonly selectedDay$ = new BehaviorSubject<Date>(new Date());

  protected readonly weekdays: string[] = ['P', 'W', 'Ś', 'C', 'P', 'S', 'N'];
  protected readonly today: Date = new Date(new Date().setHours(0, 0, 0, 0));

  protected readonly firstDay$ = new BehaviorSubject<Date>(
    this.calculateFirstDay(this.today),
  );

  protected readonly days$ = this.firstDay$.pipe(
    map((firstDay) => {
      const daysInMonth = new Date(
        firstDay.getFullYear(),
        firstDay.getMonth() + 1,
        0,
      ).getDate();

      const firstDayOfWeek = (firstDay.getDay() + 6) % 7;
      const offsetDays = Array.from(
        { length: firstDayOfWeek },
        () => null,
      );

      const monthDays = Array.from({ length: daysInMonth }, (_, i) => {
        const day = new Date(firstDay);
        day.setDate(firstDay.getDate() + i);
        return day;
      });

      return [...offsetDays, ...monthDays];
    }),
  );

  protected readonly timeAgo$ = this.firstDay$.pipe(
    map((day) => {
      const monthAgo = new Date(day);
      monthAgo.setMonth(day.getMonth() - 1);
      return this.calculateFirstDay(monthAgo);
    }),
  );

  protected readonly timeAhead$ = this.firstDay$.pipe(
    map((day) => {
      const monthAhead = new Date(day);
      monthAhead.setMonth(day.getMonth() + 1);
      return this.calculateFirstDay(monthAhead);
    }),
  );

  @Input() set date(date: Date) {
    this.selectedDay$.next(date);
    this.firstDay$.next(this.calculateFirstDay(date));
  }

  ngOnInit() {
    this.selectedDay$.subscribe((date) => {
      this.selectedDateChange.emit(date);
    });
  }

  fillDate(date: Date): string {
    const selectedDay = this.selectedDay$.value.toDateString();
    const day = date.toDateString();

    const isSelectedDay = selectedDay === day;
    const isToday = day === this.today.toDateString();

    const isHighlighted = this.highlightedDates.some(
      (highlightedDate) => highlightedDate.date.toDateString() === day,
    );

    if (isSelectedDay || isHighlighted) {
      return 'solid';
    } else if (isToday) {
      return 'outline';
    }

    return 'clear';
  }

  colorDate(date: Date): string {
    const selectedDay = this.selectedDay$.value.toDateString();
    const day = date.toDateString();

    const isSelectedDay = selectedDay === day;
    const isToday = day === this.today.toDateString();

    const highlightedDate = this.highlightedDates.find(
      (highlightedDate) => highlightedDate.date.toDateString() === day,
    );

    if (isSelectedDay && highlightedDate) {
      switch (highlightedDate.color) {
        case 'dimmed-workout-completed':
          return 'workout-completed';
        case 'dimmed-workout-in-progress':
          return 'workout-in-progress';
        case 'dimmed-workout-planned':
          return 'workout-planned';
      }
    } else if (highlightedDate) {
      return highlightedDate.color;
    } else if (isSelectedDay || isToday) {
      return 'primary';
    }

    return 'medium';
  }

  protected calculateFirstDay(day: Date) {
    return new Date(day.getFullYear(), day.getMonth(), 1);
  }
}
