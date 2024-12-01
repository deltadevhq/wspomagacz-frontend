import { Component, inject, Input } from '@angular/core';
import { WorkoutExercise } from '../../../shared/models/Workout';
import { AsyncPipe, NgIf } from '@angular/common';
import { WorkoutExercisesListComponent } from '../workout-exercises-list/workout-exercises-list.component';
import { FormsModule } from '@angular/forms';
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonText,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { WorkoutsCalendarComponent } from '../../../shared/ui/calendar/workouts-calendar/workouts-calendar.component';
import { WorkoutExerciseSetsListComponent } from './workout-exercise-sets-list/workout-exercise-sets-list.component';

@Component({
  selector: 'app-workout-exercise',
  templateUrl: './workout-exercise.component.html',
  styleUrls: ['./workout-exercise.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    WorkoutExercisesListComponent,
    FormsModule,
    IonAlert,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonInput,
    IonText,
    IonTextarea,
    IonTitle,
    IonToast,
    IonToolbar,
    NgIf,
    WorkoutsCalendarComponent,
    WorkoutExerciseSetsListComponent,
  ],
})
export class WorkoutExerciseComponent {
  modalController = inject(ModalController);

  @Input() workoutExercise?: WorkoutExercise;
}
