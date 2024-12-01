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
} from '@ionic/angular/standalone';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workout-exercise-sets-list',
  templateUrl: './workout-exercise-sets-list.component.html',
  styleUrls: ['./workout-exercise-sets-list.component.scss'],
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
    IonInput,
    FormsModule,
  ],
})
export class WorkoutExerciseSetsListComponent {
  @Input() sets: WorkoutExerciseSet[] = [];
}
