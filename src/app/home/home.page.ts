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

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, AvatarLevelProgressComponent, NotificationsComponent, IonText, IonGrid, IonRow, IonCol, LevelProgressComponent, CalendarComponent, CalendarComponent, WorkoutsCalendarComponent, WorkoutSummaryComponent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonSpinner, AvatarLevelProgressComponent, LevelProgressComponent, IonSegment, IonSegmentButton, IonLabel, IonButtons, IonMenuButton],
})
export class HomePage {
  public authService = inject(AuthService);
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
