import { Component, Input } from '@angular/core';
import { WorkoutExerciseSet } from '../../../../shared/models/Workout';
import {
  IonButton,
  IonIcon,
  IonInput,
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
} from '@ionic/angular/standalone';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-workout-exercise-sets-list',
  templateUrl: './edit-workout-exercise-sets-list.component.html',
  styleUrls: ['./edit-workout-exercise-sets-list.component.scss'],
  standalone: true,
  imports: [
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
    NgForOf,
    FormsModule,
    IonInput,
  ],
})
export class EditWorkoutExerciseSetsListComponent {
  @Input() sets: WorkoutExerciseSet[] = [];

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // Update the order parameter of each set
    const movedItem = this.sets.splice(ev.detail.from, 1)[0];
    this.sets.splice(ev.detail.to, 0, movedItem);

    this.sets.forEach((exercise, index) => {
      exercise.order = index;
    });

    ev.detail.complete();
  }

  filterInput(event: any, index: number, property: 'weight' | 'reps', min: number, max: number) {
    let input = event.target.value;

    const validInput = input.match(/^\d*$/);

    if (!validInput) {
      input = this.sets[index][property].toString();
    }

    let value = parseInt(input, 10);

    if (isNaN(value)) {
      value = min;
    } else if (value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }

    this.sets[index][property] = event.target.value = value;
  }

  removeSet(index: number) {
    this.sets.splice(index, 1);

    this.sets.forEach((exercise, index) => {
      exercise.order = index;
    });
  }

  addSet() {
    if (this.sets.length > 0) {
      this.sets.push({
        reps: this.sets[this.sets.length - 1].reps,
        weight: this.sets[this.sets.length - 1].weight,
        order: this.sets.length,
      });

      return;
    }

    this.sets.push({
      reps: 1,
      weight: 0,
      order: this.sets.length,
    });
  }

  protected readonly Math = Math;
}
