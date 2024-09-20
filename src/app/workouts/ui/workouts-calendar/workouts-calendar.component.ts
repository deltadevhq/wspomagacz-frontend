import { Component } from '@angular/core';
import {
    BehaviorSubject,
    catchError,
    map,
    Observable,
    of,
    switchMap,
} from 'rxjs';
import { Workout } from '../../../shared/models/Workout';
import { workouts } from '../../../shared/data/workouts';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
    standalone: true,
    selector: 'app-workouts-calendar',
    templateUrl: './workouts-calendar.component.html',
    styleUrls: ['./workouts-calendar.component.scss'],
    imports: [AsyncPipe, IonicModule, NgIf, NgForOf, NgClass],
})
export class WorkoutsCalendarComponent {
    protected readonly weekdays: string[] = ['P', 'W', 'Ś', 'C', 'P', 'S', 'N'];

    protected readonly today: Date = new Date();

    protected readonly selectedDay$: BehaviorSubject<Date> =
        new BehaviorSubject<Date>(new Date());
    protected readonly monthFirstDay$: BehaviorSubject<Date> =
        new BehaviorSubject<Date>(this.calculateMonthFirstDay(this.today));

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

    protected readonly monthDays$: Observable<(Date | null)[]> =
        this.monthFirstDay$.pipe(
            map((firstDay) => {
                const daysInMonth = new Date(
                    firstDay.getFullYear(),
                    firstDay.getMonth() + 1,
                    0,
                ).getDate();
                const firstDayOfWeek = firstDay.getDay();
                const offsetDays = Array.from(
                    { length: firstDayOfWeek },
                    () => null,
                );
                const monthDays = Array.from(
                    { length: daysInMonth },
                    (_, i) => {
                        const day = new Date(firstDay);
                        day.setDate(firstDay.getDate() + i);
                        return day;
                    },
                );
                return [...offsetDays, ...monthDays];
            }),
        );

    protected readonly monthAgo$: Observable<Date> = this.monthFirstDay$.pipe(
        map((day) => {
            const monthAgo = new Date(day);
            monthAgo.setMonth(day.getMonth() - 1);
            return this.calculateMonthFirstDay(monthAgo);
        }),
    );

    protected readonly monthAhead$: Observable<Date> = this.monthFirstDay$.pipe(
        map((day) => {
            const monthAhead = new Date(day);
            monthAhead.setMonth(day.getMonth() + 1);
            return this.calculateMonthFirstDay(monthAhead);
        }),
    );

    protected calculateMonthFirstDay(day: Date): Date {
        return new Date(day.getFullYear(), day.getMonth(), 1);
    }

    protected calculateDuration(startedAt: Date, finishedAt: Date): number {
        return Math.round(
            (finishedAt.getTime() - startedAt.getTime()) / 1000 / 60,
        );
    }
}
