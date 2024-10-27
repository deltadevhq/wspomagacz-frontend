import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonRow, IonText } from '@ionic/angular/standalone';
import { CalendarComponent } from '../calendar.component';
import { Workout } from '../../../models/Workout';
import { WorkoutService } from '../../../data-access/workout.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-workouts-calendar',
  templateUrl: '../calendar.component.html',
  styleUrls: ['../calendar.component.scss'],
  imports: [AsyncPipe, NgIf, NgForOf, NgClass, IonButton, IonIcon, IonText, IonGrid, IonCol, IonRow, IonContent],
})
export class WorkoutsCalendarComponent extends CalendarComponent implements OnInit {
  workoutService = inject(WorkoutService);
  workouts$ = toObservable(this.workoutService.workouts);

  selectedWorkout$ = this.selectedDate$.pipe(
    switchMap((selectedDate) => this.workouts$.pipe(
      map((workouts) => workouts.find((workout) => workout.date.toDateString() === selectedDate.toDateString())),
    )),
  );

  @Output() selectedWorkout = new EventEmitter<Workout>();

  constructor() {
    super();

    this.workouts$.subscribe((workouts) => {
      this.highlightedDates = workouts.map((workout) => ({
        date: workout.date,
        color: `dimmed-workout-${workout.status}`,
      }));
    });
  }

  override ngOnInit() {
    super.ngOnInit();

    this.selectedWorkout$.subscribe((workout) => {
      this.selectedWorkout.emit(workout);
    });
  }
}
