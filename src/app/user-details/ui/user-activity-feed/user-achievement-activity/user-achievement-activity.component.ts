import { Component, OnInit } from '@angular/core';
import { IonIcon, IonProgressBar, IonText } from '@ionic/angular/standalone';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { UserActivityComponent } from '../user-activity/user-activity.component';
import { UserAchievementComponent } from '../../user-achievements/user-achievement/user-achievement.component';

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
    UserAchievementComponent,
    NgTemplateOutlet,
  ],
})
export class UserAchievementActivityComponent extends UserActivityComponent implements OnInit {
  ngOnInit() {
    console.log(this.activity);
  }
}
