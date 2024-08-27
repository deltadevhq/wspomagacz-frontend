import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import {
    BehaviorSubject,
    catchError,
    map,
    Observable,
    of,
    switchMap,
} from 'rxjs';
import { workouts } from '../../data/workouts';
import { FormsModule } from '@angular/forms';
import { Workout } from '../../Workout';

@Component({
    standalone: true,
    selector: 'app-home-calendar',
    templateUrl: './home-calendar.component.html',
    styleUrls: ['./home-calendar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IonicModule, NgForOf, NgIf, FormsModule, AsyncPipe],
})
export class HomeCalendarComponent {
    protected readonly today: Date = new Date();

    protected readonly selectedDay$: BehaviorSubject<Date> =
        new BehaviorSubject<Date>(new Date());
    protected readonly weekFirstDay$: BehaviorSubject<Date> =
        new BehaviorSubject<Date>(this.calculateFirstWeekDay(this.today));

    protected readonly selectedDayWorkout$: Observable<Workout | undefined> =
        this.selectedDay$.pipe(
            map((day) => {
                // TODO: Replace with API call from WorkoutService
                return workouts.find((workout) => {
                    return workout.date.toDateString() === day.toDateString();
                });
            }),
        );

    protected readonly duration$: Observable<number | null> =
        this.selectedDayWorkout$.pipe(
            switchMap((workout) => {
                if (workout) {
                    if (workout.started_at && workout.finished_at) {
                        return of(
                            this.calculateDuration(
                                workout.started_at,
                                workout.finished_at,
                            ),
                        );
                    }

                    // TODO: Replace with API call from WorkoutService
                    const relatedWorkout = workouts.find(
                        (w) => w.id === workout.related_workout_id,
                    );

                    if (
                        relatedWorkout &&
                        relatedWorkout.started_at &&
                        relatedWorkout.finished_at
                    ) {
                        return of(
                            this.calculateDuration(
                                relatedWorkout.started_at,
                                relatedWorkout.finished_at,
                            ),
                        );
                    }
                }

                return of(null);
            }),
            catchError(() => of(null)),
        );

    protected readonly weekDays$: Observable<Date[]> = this.weekFirstDay$.pipe(
        map((firstDay) => {
            return Array.from({ length: 7 }, (_, i) => {
                const day = new Date(firstDay);
                day.setDate(firstDay.getDate() + i);
                return day;
            });
        }),
    );

    protected readonly weekAgo$: Observable<Date> = this.weekFirstDay$.pipe(
        map((day) => {
            const weekAgo = new Date(day);
            weekAgo.setDate(day.getDate() - 7);
            return this.calculateFirstWeekDay(weekAgo);
        }),
    );

    protected readonly weekAhead$: Observable<Date> = this.weekFirstDay$.pipe(
        map((day) => {
            const weekAhead = new Date(day);
            weekAhead.setDate(day.getDate() + 7);
            return this.calculateFirstWeekDay(weekAhead);
        }),
    );

    protected calculateFirstWeekDay(date: Date): Date {
        const firstWeekDay = new Date(date.getTime());
        const day = firstWeekDay.getDay();
        const diff = firstWeekDay.getDate() - day + (day === 0 ? -6 : 1);
        firstWeekDay.setDate(diff);
        return firstWeekDay;
    }

    protected calculateDuration(startedAt: Date, finishedAt: Date): number {
        return Math.round(
            (finishedAt.getTime() - startedAt.getTime()) / 1000 / 60,
        );
    }
}
