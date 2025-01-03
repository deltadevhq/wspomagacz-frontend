import { Component, inject, Input } from '@angular/core';
import { IonIcon, IonItem, IonLabel, IonList, IonReorder, IonText, ModalController } from '@ionic/angular/standalone';
import { NgForOf } from '@angular/common';
import { WorkoutExercise } from '../../../shared/models/Workout';
import { WorkoutExerciseComponent } from '../workout-exercise/workout-exercise.component';
import { ExerciseListComponent } from '../../../exercise-list/exercise-list.component';

@Component({
  selector: 'app-workout-exercises-list',
  templateUrl: './workout-exercises-list.component.html',
  styleUrls: ['./workout-exercises-list.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonText,
    IonItem,
    IonLabel,
    IonReorder,
    NgForOf,
    IonList,
  ],
})
export class WorkoutExercisesListComponent {
  @Input() workoutExercises: WorkoutExercise[] = [];

  private modalController = inject(ModalController);

  getMinWeight(workoutExercise: WorkoutExercise) {
    const min = workoutExercise.sets.reduce((min, set) => {
      return set.weight < min ? set.weight : min;
    }, Number.MAX_SAFE_INTEGER);

    return min === Number.MAX_SAFE_INTEGER ? undefined : min;
  }

  getMaxWeight(workoutExercise: WorkoutExercise) {
    const max = workoutExercise.sets.reduce((max, set) => {
      return set.weight > max ? set.weight : max;
    }, Number.MIN_SAFE_INTEGER);

    return max === Number.MIN_SAFE_INTEGER ? undefined : max;
  }

  getWeightRange(workoutExercise: WorkoutExercise) {
    const setsCount = workoutExercise.sets.length;

    if (setsCount === 0) {
      return 'Brak';
    }

    const minWeight = this.getMinWeight(workoutExercise);
    const maxWeight = this.getMaxWeight(workoutExercise);

    if (maxWeight === 0) {
      return 'Brak';
    }

    if (minWeight === maxWeight) {
      return `${minWeight} kg`;
    }

    return `${minWeight} - ${maxWeight} kg`;
  }

  async showWorkoutExercise(index: number) {
    const modal = await this.modalController.create({
      component: WorkoutExerciseComponent,
      componentProps: {
        workoutExercise: this.workoutExercises[index],
      },
    });

    await modal.present();

    await modal.onWillDismiss();
  }

  async addWorkoutExercises() {
    const modal = await this.modalController.create({
      component: ExerciseListComponent,
      componentProps: {
        workoutExercises: this.workoutExercises,
      },
    });

    await modal.present();

    await modal.onWillDismiss();
  }
}
