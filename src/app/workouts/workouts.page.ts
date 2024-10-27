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

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, AvatarLevelProgressComponent, NotificationsComponent, IonGrid, IonRow, IonCol, WorkoutsCalendarComponent, WorkoutSummaryComponent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonSpinner, IonText, AvatarLevelProgressComponent],
})
export class WorkoutsPage {
  authService = inject(AuthService);
  private router = inject(Router);

  selectedWorkout$ = new BehaviorSubject<Workout | undefined>(undefined);
  selectedDate$ = new BehaviorSubject<Date>(new Date());

  constructor() {
    effect(() => {
      if (!this.authService.user()) {
        this.router.navigate(['/welcome']);
      }
    });
  }
}
