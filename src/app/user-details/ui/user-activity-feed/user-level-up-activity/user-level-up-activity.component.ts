import { Component } from '@angular/core';
import { UserActivityComponent } from '../user-activity/user-activity.component';
import { IonIcon, IonProgressBar, IonText } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-level-up-activity',
  templateUrl: './user-level-up-activity.component.html',
  styleUrls: ['./user-level-up-activity.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonText,
    NgIf,
    UserActivityComponent,
    IonProgressBar,
  ],
})
export class UserLevelUpActivityComponent extends UserActivityComponent {
}
