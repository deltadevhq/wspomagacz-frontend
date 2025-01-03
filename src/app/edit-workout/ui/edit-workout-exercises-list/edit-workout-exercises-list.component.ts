import { Component, inject, Input } from '@angular/core';
import {
  IonButton,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonReorder,
  IonReorderGroup,
  IonText,
  ItemReorderEventDetail,
  ModalController,
} from '@ionic/angular/standalone';
import { NgForOf } from '@angular/common';
import { WorkoutExercise } from '../../../shared/models/Workout';
import { EditWorkoutExerciseComponent } from '../edit-workout-exercise/edit-workout-exercise.component';
import { ExerciseListComponent } from '../../../exercise-list/exercise-list.component';

@Component({
  selector: 'app-edit-workout-exercises-list',
  templateUrl: './edit-workout-exercises-list.component.html',
  styleUrls: ['./edit-workout-exercises-list.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonIcon,
    IonText,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonReorder,
    IonReorderGroup,
    NgForOf,
    IonList,
  ],
})
export class EditWorkoutExercisesListComponent {
  @Input() workoutExercises: WorkoutExercise[] = [];

  private modalController = inject(ModalController);

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // Update the order parameter of each workoutExercise
    const movedItem = this.workoutExercises.splice(ev.detail.from, 1)[0];
    this.workoutExercises.splice(ev.detail.to, 0, movedItem);

    this.workoutExercises.forEach((exercise, index) => {
      exercise.order = index;
    });

    ev.detail.complete();
  }

  removeWorkoutExercise(index: number) {
    this.workoutExercises.splice(index, 1);

    this.workoutExercises.forEach((exercise, index) => {
      exercise.order = index;
    });
  }

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

  async editWorkoutExercise(index: number) {
    const modal = await this.modalController.create({
      component: EditWorkoutExerciseComponent,
      componentProps: {
        workoutExercise: this.workoutExercises[index],
      },
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'delete') {
      this.removeWorkoutExercise(data.order);
    } else if (role === 'save') {
      this.workoutExercises[index] = data;
    }
  }

  async addWorkoutExercises() {
    const modal = await this.modalController.create({
      component: ExerciseListComponent,
      componentProps: {
        workoutExercises: this.workoutExercises,
      },
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
  }
}
