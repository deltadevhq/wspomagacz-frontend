import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonProgressBar,
  IonRow,
  IonText,
  ModalController,
} from '@ionic/angular/standalone';
import { AsyncPipe, NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { EditWorkoutComponent } from '../../../edit-workout/edit-workout.component';
import { Workout, WorkoutExercise, WorkoutStatus } from '../../models/Workout';
import { WorkoutService } from '../../data-access/workout.service';
import { DateService } from '../../date.service';
import { UserActivityFeedComponent } from '../../../user-details/ui/user-activity-feed/user-activity-feed.component';
import {
  EditWorkoutExercisesListComponent,
} from '../../../edit-workout/ui/edit-workout-exercises-list/edit-workout-exercises-list.component';

@Component({
  standalone: true,
  selector: 'app-workout-summary',
  templateUrl: './workout-summary.component.html',
  styleUrls: ['./workout-summary.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgIf, IonText, IonIcon, IonButton, IonGrid, IonCol, IonRow, IonCard, IonCardHeader, IonCardTitle, IonCardContent, NgSwitchCase, NgSwitch, NgClass, AsyncPipe, IonProgressBar, NgForOf, UserActivityFeedComponent, EditWorkoutExercisesListComponent, IonItem, IonList, IonLabel],
})
export class WorkoutSummaryComponent {
  @Input() workout?: Workout;
  @Input() date?: Date;

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
      return 'Brak';
    }

    const startTime = new Date(this.workout.started_at);
    const duration = this.dateService.getDurationInMinutes(startTime, new Date());
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
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
