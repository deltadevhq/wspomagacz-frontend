import { Component, inject, Input } from '@angular/core';
import { WorkoutExercise } from '../shared/models/Workout';
import { NgIf } from '@angular/common';
import { IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-workout-exercise',
  templateUrl: './workout-exercise-details.component.html',
  styleUrls: ['./workout-exercise-details.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonTitle,
    IonButtons,
  ],
})
export class WorkoutExerciseDetailsComponent {
  @Input() workoutExercise?: WorkoutExercise;

  private modalController = inject(ModalController);

  confirm() {
    return this.modalController.dismiss(this.workoutExercise);
  }
}
