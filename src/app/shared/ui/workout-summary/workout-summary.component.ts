import { Component, inject, Input } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonText,
  ModalController,
} from '@ionic/angular/standalone';
import { NgClass, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { EditWorkoutComponent } from '../../../edit-workout/edit-workout.component';
import { Workout, WorkoutStatus } from '../../models/Workout';
import { WorkoutService } from '../../data-access/workout.service';
import { DateService } from '../../date.service';

@Component({
  standalone: true,
  selector: 'app-workout-summary',
  templateUrl: './workout-summary.component.html',
  styleUrls: ['./workout-summary.component.scss'],
  imports: [NgIf, IonText, IonIcon, IonButton, IonGrid, IonCol, IonRow, IonCard, IonCardHeader, IonCardTitle, IonCardContent, NgSwitchCase, NgSwitch, NgClass],
})
export class WorkoutSummaryComponent {
  @Input() workout?: Workout;
  @Input() duration?: number;
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
}
