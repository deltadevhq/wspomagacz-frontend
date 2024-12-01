import { Component, Input } from '@angular/core';
import { IonIcon, IonProgressBar, IonText } from '@ionic/angular/standalone';
import { NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
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
    NgIf,
    NgTemplateOutlet,
  ],
})
export class UserAchievementComponent {
  @Input({ required: true }) achievement!: UserAchievement;
}
