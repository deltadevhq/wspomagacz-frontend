import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input, OnChanges } from '@angular/core';
import { IonButton, IonIcon, IonItem, IonLabel, IonList, IonText, ModalController } from '@ionic/angular/standalone';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { EditWorkoutComponent } from '../../../edit-workout/edit-workout.component';
import { Workout, WorkoutExercise, WorkoutStatus } from '../../models/Workout';
import { WorkoutService } from '../../data-access/workout.service';
import { DateService } from '../../date.service';

@Component({
  standalone: true,
  selector: 'app-workout-summary',
  templateUrl: './workout-summary.component.html',
  styleUrls: ['./workout-summary.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgIf, IonText, IonIcon, IonButton, NgClass, NgForOf, IonItem, IonList, IonLabel],
})
export class WorkoutSummaryComponent implements OnChanges {
  @Input() workout?: Workout;
  @Input() date?: Date;

  duration: string = '00:00:00';
  durationInterval: any;

  private modalController = inject(ModalController);

  workoutService = inject(WorkoutService);
  dateService = inject(DateService);

  async openWorkoutEditModal(role: string) {
    const modal = await this.modalController.create({
      component: EditWorkoutComponent,
      componentProps: {
        initialWorkout: this.workout,
        initialDate: this.date,
        role: role,
      },
    });

    await modal.present();
    await modal.onWillDismiss();
  }

  protected readonly WorkoutStatuses = WorkoutStatus;

  getDuration() {
    if (!this.workout?.started_at) {
      this.duration = '00:00:00';
      return;
    }

    const duration = () => {
      const startTime = new Date(this.workout?.started_at!);
      const currentDuration = this.dateService.getDurationInSeconds(startTime, new Date());

      const hours = Math.floor(currentDuration / 3600);
      const minutes = Math.floor((currentDuration % 3600) / 60);
      const seconds = currentDuration % 60;
      this.duration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    duration();

    this.durationInterval = setInterval(() => {
      duration();
    }, 1000);
  }

  ngOnChanges() {
    if (this.durationInterval) {
      clearInterval(this.durationInterval);
    }

    this.getDuration();
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
}
