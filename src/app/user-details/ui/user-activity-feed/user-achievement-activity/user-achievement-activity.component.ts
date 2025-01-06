import { Component } from '@angular/core';
import { IonIcon, IonText } from '@ionic/angular/standalone';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { UserActivityComponent } from '../user-activity/user-activity.component';

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
    NgTemplateOutlet,
  ],
})
export class UserAchievementActivityComponent extends UserActivityComponent {
}
