import { Component, inject, input, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { IonIcon, IonProgressBar, IonText } from '@ionic/angular/standalone';
import { AchievementService } from '../../../shared/data-access/achievement.service';
import { UserAchievement } from '../../../shared/models/UserAchievement';
import { UserAchievementComponent } from './user-achievement/user-achievement.component';

@Component({
  selector: 'app-user-achievements',
  templateUrl: './user-achievements.component.html',
  styleUrls: ['./user-achievements.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    IonIcon,
    IonProgressBar,
    IonText,
    NgForOf,
    UserAchievementComponent,
  ],
})
export class UserAchievementsComponent implements OnInit {
  userId = input.required<number>();

  private achievementService = inject(AchievementService);

  achievements: UserAchievement[] = [];

  ngOnInit() {
    this.achievementService.getAchievements(this.userId()).subscribe(
      (achievements) => {
        const filteredAchievements = achievements.filter((achievement, index, self) => {
          if (achievement.achievement.type.startsWith('exercise_')) {
            return !self.some(
              (other) =>
                other.exercise_id === achievement.exercise_id &&
                other.achievement.tier > achievement.achievement.tier,
            );
          } else {
            return !self.some(
              (other) =>
                other.achievement.type === achievement.achievement.type &&
                other.achievement.tier > achievement.achievement.tier,
            );
          }
        });

        this.achievements = filteredAchievements.sort(
          (a, b) => b.achievement.tier - a.achievement.tier || Number(b.achieved) - Number(a.achieved),
        );
      },
    );
  }
}
