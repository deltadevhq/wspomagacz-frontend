import {ChangeDetectionStrategy, Component} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {HomeCalendarDayComponent} from "./home-calendar-day/home-calendar-day.component";
import {BehaviorSubject, map} from "rxjs";
import {workouts} from "../../data/workouts";
import {FormsModule} from "@angular/forms";

@Component({
    standalone: true,
    selector: 'app-home-calendar',
    templateUrl: './home-calendar.component.html',
    styleUrls: ['./home-calendar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        IonicModule,
        NgForOf,
        HomeCalendarDayComponent,
        NgIf,
        FormsModule,
        AsyncPipe
    ]
})
export class HomeCalendarComponent {
    protected readonly today: Date = new Date();

    protected selectedDay$ = new BehaviorSubject<Date>(new Date());
    protected selectedDayWorkout$ = this.selectedDay$.pipe(
        map(day => {
            return workouts.find(workout => {
                return workout.date.toDateString() === day.toDateString();
            });
        }),
    );

    protected weekFirstDay$ = new BehaviorSubject<Date>(this.calculateFirstWeekDay(this.today));
    protected weekDays$ = this.weekFirstDay$.pipe(
        map(firstDay => {
            return Array.from({length: 7}, (_, i) => {
                const day = new Date(firstDay);
                day.setDate(firstDay.getDate() + i);
                return day;
            });
        })
    )

    protected weekAgo$ = this.weekFirstDay$.pipe(
        map(day => {
            const weekAgo = new Date(day);
            weekAgo.setDate(day.getDate() - 7);
            return this.calculateFirstWeekDay(weekAgo);
        })
    );

    protected weekAhead$ = this.weekFirstDay$.pipe(
        map(day => {
            const weekAhead = new Date(day);
            weekAhead.setDate(day.getDate() + 7);
            return this.calculateFirstWeekDay(weekAhead);
        })
    );

    protected resetWeek() {
        this.setWeekFirstDay(this.calculateFirstWeekDay(this.today));
        this.setSelectedDay(this.today);
    }

    protected setSelectedDay(day: Date) {
        this.selectedDay$.next(day);
    }

    protected setWeekFirstDay(date: Date) {
        this.weekFirstDay$.next(date);
    }

    protected calculateFirstWeekDay(date: Date): Date {
        const firstWeekDay = new Date(date.getTime());
        const day = firstWeekDay.getDay();
        const diff = firstWeekDay.getDate() - day + (day === 0 ? -6 : 1);
        firstWeekDay.setDate(diff);
        return firstWeekDay;
    }
}
