import { ChangeDetectorRef, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonRow,
  IonSpinner,
  IonText,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { transformWorkoutToRequest, Workout, WorkoutRequest } from '../shared/models/Workout';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from '../shared/ui/calendar/calendar.component';
import { WorkoutService } from '../shared/data-access/workout.service';
import { BehaviorSubject, map, Subject, switchMap, takeUntil } from 'rxjs';
import {
  EditWorkoutExercisesListComponent,
} from './ui/edit-workout-exercises-list/edit-workout-exercises-list.component';
import { WorkoutsCalendarComponent } from '../shared/ui/calendar/workouts-calendar/workouts-calendar.component';
import { DateService } from '../shared/date.service';

@Component({
  standalone: true,
  selector: 'app-workout-modal',
  templateUrl: './edit-workout.component.html',
  styleUrls: ['./edit-workout.component.scss'],
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    WorkoutsCalendarComponent,
    CalendarComponent,
    AsyncPipe,
    NgClass,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    IonContent,
    IonInput,
    IonIcon,
    IonText,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonTextarea,
    IonAlert,
    IonFooter,
    IonSpinner,
    FormsModule,
    WorkoutsCalendarComponent,
    IonGrid,
    IonRow,
    IonCol,
    EditWorkoutExercisesListComponent,
    IonToast,
  ],
})
export class EditWorkoutComponent implements OnInit, OnDestroy {
  workoutService = inject(WorkoutService);
  dateService = inject(DateService);

  modalController = inject(ModalController);
  cdr = inject(ChangeDetectorRef);

  private readonly defaultWorkout: WorkoutRequest = {
    id: undefined,
    related_workout_id: undefined,
    name: '',
    date: this.dateService.today.toLocaleDateString('sv-SE'),
    exercises: [],
    notes: '',
  };

  @Input() initialWorkout?: Workout;
  @Input() initialDate?: Date;
  @Input() role?: string;

  workout$ = new BehaviorSubject<WorkoutRequest>(this.defaultWorkout);
  calendarDate$ = new BehaviorSubject<Date>(this.dateService.today);
  calendarWorkout$ = new BehaviorSubject<Workout | undefined>(undefined);
  showCalendar$ = new BehaviorSubject<boolean>(false);

  dateIcon$ = this.showCalendar$.pipe(
    map((showCalendar) => (showCalendar ? 'chevron-up' : 'chevron-down')),
  );

  state$ = this.workout$.pipe(
    switchMap((workout) =>
      this.calendarWorkout$.pipe(
        map((calendarWorkout) => ({
          canSave: calendarWorkout?.status !== 'completed' && this.calendarDate$.value >= this.dateService.today,
          canDelete: !!workout.id,
          calendarWorkoutExists: !!calendarWorkout && calendarWorkout.id !== workout.id && calendarWorkout.status !== 'completed',
          calendarWorkoutError: calendarWorkout?.status === 'completed',
          pastDateError: calendarWorkout?.status !== 'completed' && this.calendarDate$.value < this.dateService.today,
        })),
      ),
    ),
  );

  isWorkoutNameValid = true;

  private destroy$ = new Subject<void>();

  constructor() {
    this.workoutService.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe((error) => {
        if (error === null) {
          this.modalController.dismiss();
        }
      });

    this.calendarDate$
      .pipe(takeUntil(this.destroy$))
      .subscribe((date) => {
        this.workout$.next({
          ...this.workout$.value,
          date: date.toLocaleDateString('sv-SE'),
        });
      });
  }


  ngOnInit() {
    switch (this.role) {
      case 'edit':
        const editedWorkout: WorkoutRequest = {
          id: this.initialWorkout?.id,
          related_workout_id: this.initialWorkout?.related_workout_id,
          name: this.initialWorkout?.name || '',
          date: (this.initialWorkout?.date || this.dateService.today).toLocaleDateString('sv-SE'),
          exercises: this.initialWorkout?.exercises || [],
          notes: this.initialWorkout?.notes || '',
        };

        this.workout$.next(editedWorkout);
        break;
      case 'create-related':
        this.initialDate = this.dateService.today;
        this.calendarDate$.next(this.initialDate);
        this.setWorkoutAsRelated(this.initialWorkout);
        break;
      case 'create':
      default:
        this.workout$.next(this.defaultWorkout);
        break;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setWorkoutAsRelated(workout?: Workout) {
    if (!workout) {
      return;
    }

    const newWorkout: WorkoutRequest = {
      ...workout,
      id: undefined,
      related_workout_id: workout.id || workout.related_workout_id,
      date: this.dateService.today.toLocaleDateString('sv-SE'),
      notes: '',
    };

    this.workout$.next(newWorkout);

    this.cdr.detectChanges();
  }

  public alertButtons = [
    {
      text: 'Usuń',
      role: 'delete',
      handler: () => {
        this.workoutService.delete$.next(this.workout$.value.id!);
      },
    },
    {
      text: 'Anuluj',
      role: 'cancel',
      handler: () => {
        return;
      },
    },
  ];

  deleteAlert(ev: any) {
    if (ev.detail.role === 'delete') {
      return this.modalController.dismiss();
    }

    return;
  }

  protected readonly transformWorkoutToRequest = transformWorkoutToRequest;
}
