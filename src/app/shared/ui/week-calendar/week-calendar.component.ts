import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonButton, IonIcon, IonText } from '@ionic/angular/standalone';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { map, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  standalone: true,
  selector: 'app-week-calendar',
  templateUrl: './week-calendar.component.html',
  styleUrls: ['./week-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgForOf, NgIf, FormsModule, AsyncPipe, RouterModule, IonButton, IonIcon, IonText],
})
export class WeekCalendarComponent extends CalendarComponent {
  protected override readonly days$: Observable<Date[]> = this.firstDay$.pipe(
    map((firstDay) => {
      return Array.from({ length: 7 }, (_, i) => {
        const day = new Date(firstDay);
        day.setDate(firstDay.getDate() + i);
        return day;
      });
    }),
  );

  protected override readonly timeAgo$ = this.firstDay$.pipe(
    map((day) => {
      const weekAgo = new Date(day);
      weekAgo.setDate(day.getDate() - 7);
      return this.calculateFirstDay(weekAgo);
    }),
  );

  protected override readonly timeAhead$ = this.firstDay$.pipe(
    map((day) => {
      const weekAhead = new Date(day);
      weekAhead.setDate(day.getDate() + 7);
      return this.calculateFirstDay(weekAhead);
    }),
  );

  protected override calculateFirstDay(date: Date): Date {
    const firstDay = new Date(date.getTime());
    const day = firstDay.getDay();
    const diff = firstDay.getDate() - day + (day === 0 ? -6 : 1);
    firstDay.setDate(diff);
    return firstDay;
  }
}
