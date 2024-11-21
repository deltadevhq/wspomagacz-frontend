import { Component, Input } from '@angular/core';
import { IonIcon, IonProgressBar, IonText } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { UserActivityComponent } from '../user-activity/user-activity.component';
import { UserActivity } from '../../../../shared/models/UserActivity';

@Component({
  selector: 'app-user-achievement-activity',
  templateUrl: './user-achievement-activity.component.html',
  styleUrls: ['./user-achievement-activity.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonText,
    NgIf,
    UserActivityComponent,
    IonProgressBar,
  ],
})
export class UserAchievementActivityComponent {
  @Input() activity?: UserActivity;
}
