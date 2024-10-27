import { Component, inject, Input } from '@angular/core';
import { WorkoutExercise } from '../../../shared/models/Workout';
import { AsyncPipe, NgIf } from '@angular/common';
import {
  EditWorkoutExercisesListComponent,
} from '../edit-workout-exercises-list/edit-workout-exercises-list.component';
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
import {
  EditWorkoutExerciseSetsListComponent,
} from './edit-workout-exercise-sets-list/edit-workout-exercise-sets-list.component';

@Component({
  selector: 'app-edit-workout-exercise',
  templateUrl: './edit-workout-exercise.component.html',
  styleUrls: ['./edit-workout-exercise.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    EditWorkoutExercisesListComponent,
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
    EditWorkoutExerciseSetsListComponent,
  ],
})
export class EditWorkoutExerciseComponent {
  modalController = inject(ModalController);

  @Input() workoutExercise?: WorkoutExercise;
}
