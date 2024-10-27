import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { IonButton, IonCol, IonGrid, IonIcon, IonRow, IonText } from '@ionic/angular/standalone';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { DateService } from '../../date.service';

export interface HighlightedDate {
  date: Date;
  color: string;
}

@Component({
  standalone: true,
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  imports: [AsyncPipe, NgIf, NgForOf, IonButton, IonIcon, IonText, IonCol, IonRow, IonGrid],
})
export class CalendarComponent implements OnInit {
  @Input() highlightedDates: HighlightedDate[] = [];
  @Input() initialDate?: Date;
  @Input() type: 'week' | 'month' = 'month';

  @Output() selectedDate = new EventEmitter<Date>();

  readonly selectedDate$ = new BehaviorSubject<Date>(new Date());

  protected readonly weekdays: string[] = ['P', 'W', 'Ś', 'C', 'P', 'S', 'N'];

  private dateService = inject(DateService);

  protected readonly firstDay$ = new BehaviorSubject<Date>(
    this.calculateFirstDay(this.dateService.today),
  );

  protected readonly days$ = this.firstDay$.pipe(
    map((firstDay) => {
      if (this.type === 'week') {
        return Array.from({ length: 7 }, (_, i) => {
          const day = new Date(firstDay);
          day.setDate(firstDay.getDate() + i);
          return day;
        });
      }

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
      if (this.type === 'week') {
        const weekAgo = new Date(day);
        weekAgo.setDate(day.getDate() - 7);
        return this.calculateFirstDay(weekAgo);
      }

      const monthAgo = new Date(day);
      monthAgo.setMonth(day.getMonth() - 1);
      return this.calculateFirstDay(monthAgo);
    }),
  );

  protected readonly timeAhead$ = this.firstDay$.pipe(
    map((day) => {
      if (this.type === 'week') {
        const weekAhead = new Date(day);
        weekAhead.setDate(day.getDate() + 7);
        return this.calculateFirstDay(weekAhead);
      }

      const monthAhead = new Date(day);
      monthAhead.setMonth(day.getMonth() + 1);
      return this.calculateFirstDay(monthAhead);
    }),
  );

  ngOnInit() {
    this.selectedDate$.next(this.initialDate ?? new Date());
    this.firstDay$.next(this.calculateFirstDay(this.selectedDate$.value));

    this.selectedDate$.subscribe((date) => {
      this.selectedDate.emit(date);
    });
  }

  getDateFill(date: Date): string {
    const selectedDay = this.selectedDate$.value.toDateString();
    const day = date.toDateString();

    const isSelectedDay = selectedDay === day;
    const isToday = day === this.dateService.today.toDateString();

    const isHighlighted = this.highlightedDates.some(
      (highlightedDate) => highlightedDate.date.toDateString() === day,
    );

    if (isSelectedDay) {
      return 'solid';
    }

    if (isToday) {
      return 'outline';
    }

    if (isHighlighted) {
      return 'solid';
    }

    return 'clear';
  }

  getDateColor(date: Date): string {
    const selectedDay = this.selectedDate$.value.toDateString();
    const day = date.toDateString();

    const isSelectedDay = selectedDay === day;
    const isToday = day === this.dateService.today.toDateString();

    const highlightedDate = this.highlightedDates.find(
      (highlightedDate) => highlightedDate.date.toDateString() === day,
    );

    if (isSelectedDay && highlightedDate) {
      switch (highlightedDate.color) {
        case 'dimmed-workout-completed':
          return 'workout-completed';
        case 'dimmed-workout-in_progress':
          return 'workout-in_progress';
        case 'dimmed-workout-planned':
          return 'workout-planned';
        case 'dimmed-workout-skipped':
          return 'workout-skipped';
      }
    } else if (highlightedDate) {
      return highlightedDate.color;
    } else if (isSelectedDay || isToday) {
      return 'primary';
    }

    return 'medium';
  }

  protected calculateFirstDay(day: Date) {
    if (this.type === 'week') {
      return new Date(day.getFullYear(), day.getMonth(), day.getDate() - ((day.getDay() + 6) % 7));
    }

    return new Date(day.getFullYear(), day.getMonth(), 1);
  }
}
