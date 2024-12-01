import { Component, inject, Input } from '@angular/core';
import {
  EditWorkoutExerciseSetsListComponent,
} from '../../../../edit-workout/ui/edit-workout-exercise/edit-workout-exercise-sets-list/edit-workout-exercise-sets-list.component';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { WorkoutExercise } from '../../../models/Workout';

@Component({
  selector: 'app-edit-workout-exercise-summary',
  templateUrl: './edit-workout-exercise-summary.component.html',
  styleUrls: ['./edit-workout-exercise-summary.component.scss'],
  standalone: true,
  imports: [
    EditWorkoutExerciseSetsListComponent,
    IonButton,
    IonButtons,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonText,
    IonTitle,
    IonToolbar,
    NgIf,
  ],
})
export class EditWorkoutExerciseSummaryComponent {
  modalController = inject(ModalController);

  @Input() workoutExercise?: WorkoutExercise;
}
