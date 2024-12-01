import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { CalendarComponent } from '../shared/ui/calendar/calendar.component';
import { AuthService } from '../shared/data-access/auth.service';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../shared/ui/notifications/notifications.component';
import { WorkoutSummaryComponent } from '../shared/ui/workout-summary/workout-summary.component';
import { Workout } from '../shared/models/Workout';
import { WorkoutsCalendarComponent } from '../shared/ui/calendar/workouts-calendar/workouts-calendar.component';
import { BehaviorSubject } from 'rxjs';
import { AvatarLevelProgressComponent } from '../shared/ui/avatar-level-progress/avatar-level-progress.component';
import { LevelProgressComponent } from '../shared/ui/level-progress/level-progress.component';
import { WorkoutService } from '../shared/data-access/workout.service';
import { DateService } from '../shared/date.service';
import { EditWorkoutComponent } from '../edit-workout/edit-workout.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, AvatarLevelProgressComponent, NotificationsComponent, IonText, IonGrid, IonRow, IonCol, LevelProgressComponent, CalendarComponent, CalendarComponent, WorkoutsCalendarComponent, WorkoutSummaryComponent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonSpinner, AvatarLevelProgressComponent, LevelProgressComponent, IonSegment, IonSegmentButton, IonLabel, IonButtons, IonMenuButton],
})
export class HomePage {
  public authService = inject(AuthService);
  workoutService = inject(WorkoutService);
  dateService = inject(DateService);
  private router = inject(Router);
  modalController = inject(ModalController);

  selectedWorkout$ = new BehaviorSubject<Workout | undefined>(undefined);
  selectedDate$ = new BehaviorSubject<Date>(new Date());

  workouts: Workout[] = [];

  constructor() {
    effect(() => {
      if (!this.authService.user()) {
        this.router.navigate(['/welcome']);
      }
    });

    this.workoutService.getWorkouts('completed', 1).subscribe((workouts) => {
      this.workouts = workouts.slice(0, 5);
    });
  }

  async openWorkoutEditModal(workout: Workout, role: string) {
    const modal = await this.modalController.create({
      component: EditWorkoutComponent,
      componentProps: {
        initialWorkout: workout,
        role: role,
      },
    });

    await modal.present();
    await modal.onWillDismiss();
  }
}
