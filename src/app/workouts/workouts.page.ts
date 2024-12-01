import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonReorder,
  IonReorderGroup,
  IonRow,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { NotificationsComponent } from '../shared/ui/notifications/notifications.component';
import { WorkoutSummaryComponent } from '../shared/ui/workout-summary/workout-summary.component';
import { WorkoutsCalendarComponent } from '../shared/ui/calendar/workouts-calendar/workouts-calendar.component';
import { AuthService } from '../shared/data-access/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Workout } from '../shared/models/Workout';
import { AvatarLevelProgressComponent } from '../shared/ui/avatar-level-progress/avatar-level-progress.component';
import { WorkoutService } from '../shared/data-access/workout.service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, AvatarLevelProgressComponent, NotificationsComponent, IonGrid, IonRow, IonCol, WorkoutsCalendarComponent, WorkoutSummaryComponent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonSpinner, IonText, AvatarLevelProgressComponent, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonReorder, IonReorderGroup],
})
export class WorkoutsPage {
  authService = inject(AuthService);
  workoutService = inject(WorkoutService);
  private router = inject(Router);

  workouts: Workout[] = [];

  selectedWorkout$ = new BehaviorSubject<Workout | undefined>(undefined);
  selectedDate$ = new BehaviorSubject<Date>(new Date());

  constructor() {
    effect(() => {
      if (!this.authService.user()) {
        this.router.navigate(['/welcome']);
      }
    });

    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 31);

    this.workouts = this.workoutService.workouts().filter(workout => workout.date >= monthAgo && workout.status === 'completed');
  }
}
