import { Component, inject } from '@angular/core';
import { ExerciseService } from '../shared/data-access/exercise.service';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ExerciseDetailsComponent } from '../exercise-details/exercise-details.component';
import { WorkoutExercise } from '../shared/models/Workout';
import { Exercise } from '../shared/models/Exercise';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  EditWorkoutExercisesListComponent,
} from '../edit-workout/ui/edit-workout-exercises-list/edit-workout-exercises-list.component';

@Component({
  standalone: true,
  selector: 'app-exercises',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss'],
  imports: [NgForOf, NgIf, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle, IonSearchbar, IonContent, IonItemGroup, IonList, IonItemSliding, IonItem, IonLabel, IonText, IonItemOptions, IonItemOption, AsyncPipe, EditWorkoutExercisesListComponent],
})
export class ExerciseListComponent {
  workoutExercises: WorkoutExercise[] = [];

  private exerciseService = inject(ExerciseService);
  exercises$ = toObservable(this.exerciseService.exercises);

  private modalController = inject(ModalController);

  private searchQuery$ = new BehaviorSubject<string>('');

  standardExercises$ = this.exercises$.pipe(
    switchMap((exercises) => {
      return this.searchQuery$.pipe(
        map((query) => {
          return exercises.filter((exercise) => {
            return exercise.exercise_type === 'standard' && exercise.exercise_name.toLowerCase().includes(query);
          });
        }),
      );
    }),
  );

  customExercises$ = this.exercises$.pipe(
    switchMap((exercises) => {
      return this.searchQuery$.pipe(
        map((query) => {
          return exercises.filter((exercise) => {
            return exercise.exercise_type === 'custom' && exercise.exercise_name.toLowerCase().includes(query);
          });
        }),
      );
    }),
  );

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalController.dismiss(this.workoutExercises, 'confirm');
  }

  async openExerciseDetailsModal(exercise: Exercise) {
    const modal = await this.modalController.create({
      component: ExerciseDetailsComponent,
      componentProps: {
        exercise: exercise,
      },
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'add') {
      this.addExercise(data);
    }
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.searchQuery$.next(query);
  }

  addExercise(exercise: Exercise) {
    const exerciseExists = this.workoutExercises.find(
      (e) => e.exercise.exercise_id === exercise.exercise_id && exercise.exercise_type === e.exercise.exercise_type,
    );

    if (exerciseExists) {
      exerciseExists.sets.push({
        reps: 1,
        weight: 0,
        order: exerciseExists.sets.length,
      });

      return;
    }

    this.workoutExercises.push({
      exercise: exercise,
      sets: [
        {
          reps: 1,
          weight: 0,
          order: 0,
        },
      ],
      order: this.workoutExercises.length,
    });
  }

  isExerciseInWorkout(exercise: Exercise) {
    return this.workoutExercises.some((e) => e.exercise.exercise_id === exercise.exercise_id && exercise.exercise_type === e.exercise.exercise_type);
  }
}
