import { Component, Input } from '@angular/core';
import { IonIcon, IonProgressBar, IonText } from '@ionic/angular/standalone';
import { NgForOf } from '@angular/common';
import { UserAchievement } from '../../../../shared/models/UserAchievement';

@Component({
  selector: 'app-user-achievement',
  templateUrl: './user-achievement.component.html',
  styleUrls: ['./user-achievement.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonProgressBar,
    IonText,
    NgForOf,
  ],
})
export class UserAchievementComponent {
  @Input() userAchievement?: UserAchievement = {
    achieved_at: new Date(),
    achievement: {
      id: 0,
      name: 'Test',
      description: 'This is a test achievement.',
      goal: 0,
      xp: 0,
      category: 'basics',
    },
    achievement_id: 0,
    progress: 0,
    started_at: new Date(),
    user_id: 1,
  };
}
