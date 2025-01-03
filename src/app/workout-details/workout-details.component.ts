import { Component, inject, OnInit } from '@angular/core';
import { WorkoutSummary } from '../shared/models/Workout';
import { NgForOf, NgIf } from '@angular/common';
import { WorkoutService } from '../shared/data-access/workout.service';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonProgressBar,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { ExperienceService, LevelResponse } from '../shared/data-access/experience.service';
import { WorkoutExercisesListComponent } from './ui/workout-exercises-list/workout-exercises-list.component';
import {
  UserAchievementComponent,
} from '../user-details/ui/user-achievements/user-achievement/user-achievement.component';
import { DateService } from '../shared/date.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.component.html',
  styleUrls: ['./workout-details.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    IonProgressBar,
    IonText,
    NgForOf,
    IonContent,
    IonIcon,
    IonButton,
    IonButtons,
    IonTitle,
    IonBackButton,
    IonToolbar,
    IonHeader,
    WorkoutExercisesListComponent,
    UserAchievementComponent,
  ],
  animations: [
    trigger('progressAnimation', [
      transition(':enter', [
        style({ width: '0%' }),
        animate('1s ease-out', style({ width: '*' })),
      ]),
    ]),
  ],
})
export class WorkoutDetailsComponent implements OnInit {
  workoutId?: number;

  summary?: WorkoutSummary;
  levelAfterAchievements?: LevelResponse;
  levelBeforeWorkout?: LevelResponse;

  private workoutService = inject(WorkoutService);
  private experienceService = inject(ExperienceService);
  private dateService = inject(DateService);

  modalController = inject(ModalController);

  ngOnInit() {
    if (!this.workoutId) {
      return;
    }

    this.workoutService.getWorkoutSummaryById(this.workoutId).subscribe((summary) => {
      this.summary = summary;

      this.experienceService.getLevelByExperience(this.getExpAfterAchievements()).subscribe((level) => {
        this.levelAfterAchievements = level;
      });

      this.experienceService.getLevelByExperience(this.summary?.exp_before).subscribe((level) => {
        this.levelBeforeWorkout = level;
      });
    });

  }

  getExpGranted() {
    if (!this.summary) return 0;

    return this.summary.exp_granted + this.getAchievementsExp();
  }

  getExpAfterAchievements() {
    if (!this.summary) return 0;

    return this.summary.exp_after + this.getAchievementsExp();
  }

  getAchievementsExp() {
    if (!this.summary) return 0;

    let achievementsExp = 0;

    this.summary.achievements.filter(achievement => achievement.achieved).forEach(achievement => achievementsExp += achievement.achievement.xp);

    return achievementsExp;
  }

  getDuration() {
    if (!this.summary) {
      return 'Brak';
    }

    const startTime = new Date(this.summary.started_at!);
    const endTime = new Date(this.summary.finished_at!);
    const duration = this.dateService.getDurationInMinutes(startTime, endTime);
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
}
