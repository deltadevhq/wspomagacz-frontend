import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Workout } from '../../../shared/models/Workout';
import { workouts } from '../../../shared/data/workouts';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {
    CalendarComponent,
    HighlightedDate,
} from '../../../calendar/calendar.component';

@Component({
    standalone: true,
    selector: 'app-workouts-calendar',
    templateUrl: './workouts-calendar.component.html',
    styleUrls: ['./workouts-calendar.component.scss'],
    imports: [AsyncPipe, IonicModule, NgIf, NgForOf, NgClass],
})
export class WorkoutsCalendarComponent
    extends CalendarComponent
    implements OnInit
{
    @Input() workouts: Workout[] = [...workouts];
    @Output() selectedWorkoutChange = new EventEmitter<Workout>();
    @Output() selectedWorkoutDurationChange = new EventEmitter<
        number | undefined
    >();

    override ngOnInit() {
        super.ngOnInit();

        this.selectedDayWorkout$.subscribe((workout) => {
            this.selectedWorkoutChange.emit(workout);
        });

        this.duration$.subscribe((duration) => {
            this.selectedWorkoutDurationChange.emit(duration);
        });
    }

    protected readonly selectedDayWorkout$: Observable<Workout | undefined> =
        this.selectedDay$.pipe(
            map((day) => {
                return workouts.find((workout) => {
                    return workout.date.toDateString() === day.toDateString();
                });
            }),
        );

    override highlightedDates: HighlightedDate[] = this.workouts.map(
        (workout) => {
            return {
                date: workout.date,
                color: workout.finished_at
                    ? 'success'
                    : workout.started_at
                      ? 'warning'
                      : 'secondary',
            };
        },
    );

    protected readonly duration$: Observable<number | undefined> =
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

                return of(undefined);
            }),
            catchError(() => of(undefined)),
        );

    protected calculateDuration(startedAt: Date, finishedAt: Date): number {
        return Math.round(
            (finishedAt.getTime() - startedAt.getTime()) / 1000 / 60,
        );
    }
}
