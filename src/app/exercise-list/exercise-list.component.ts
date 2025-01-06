import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ExerciseService } from '../shared/data-access/exercise.service';
import {
  InfiniteScrollCustomEvent,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonItem,
  IonItemGroup,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonSearchbar,
  IonSkeletonText,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { NgForOf, NgIf } from '@angular/common';
import { ExerciseDetailsComponent } from '../exercise-details/exercise-details.component';
import { WorkoutExercise } from '../shared/models/Workout';
import { Exercise } from '../shared/models/Exercise';
import { BehaviorSubject, debounceTime } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-exercises',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss'],
  imports: [NgForOf, NgIf, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle, IonSearchbar, IonContent, IonItemGroup, IonList, IonItemSliding, IonItem, IonLabel, IonText, IonItemOptions, IonItemOption, IonInfiniteScroll, IonSkeletonText, IonFooter],
})
export class ExerciseListComponent implements OnInit {
  workoutExercises: WorkoutExercise[] = [];

  private exerciseService = inject(ExerciseService);

  @ViewChild('infiniteScroll') infiniteScroll?: IonInfiniteScroll;

  exercises: Exercise[] = [];

  modalController = inject(ModalController);

  ngOnInit() {
    this.exerciseService.getExercises().subscribe((exercises) => {
      this.exercises = exercises;

      if (this.infiniteScroll && exercises.length === 0) {
        this.infiniteScroll.disabled = true;
      }
    });

    this.searchQuery$.pipe(
      debounceTime(300),
    ).subscribe((query) => {
      this.exerciseService.getExercises(0, 20, query).subscribe((exercises) => {
        this.exercises = exercises;

        if (this.infiniteScroll) {
          this.infiniteScroll.disabled = exercises.length === 0;
        }
      });
    });
  }

  private searchQuery$ = new BehaviorSubject<string>('');

  getStandardExercises() {
    return this.exercises.filter((exercise) => exercise.exercise_type === 'standard');
  }

  getCustomExercises() {
    return this.exercises.filter((exercise) => exercise.exercise_type === 'custom');
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
    const query = event.target.value.toLowerCase().trim();
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

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    const offset = this.exercises.length + 1;

    this.exerciseService.getExercises(offset, 20, this.searchQuery$.value).subscribe(
      (exercises) => {
        this.exercises = [...this.exercises, ...exercises];
        event.target.complete();

        if (exercises.length === 0) {
          event.target.disabled = true;
        }
      },
    );
  }

  removeWorkoutExercise(index: number) {
    this.workoutExercises.splice(index, 1);

    this.workoutExercises.forEach((exercise, index) => {
      exercise.order = index;
    });
  }

  isExerciseInWorkout(exercise: Exercise) {
    return this.workoutExercises.some((e) => e.exercise.exercise_id === exercise.exercise_id && exercise.exercise_type === e.exercise.exercise_type);
  }
}
