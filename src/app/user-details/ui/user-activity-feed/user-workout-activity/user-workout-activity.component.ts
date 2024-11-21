import { Component } from '@angular/core';
import { UserActivityComponent } from '../user-activity/user-activity.component';
import { IonIcon, IonText } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-workout-activity',
  templateUrl: './user-workout-activity.component.html',
  styleUrls: ['./user-workout-activity.component.scss'],
  standalone: true,
  imports: [
    UserActivityComponent,
    IonIcon,
    IonText,
    NgIf,
  ],
})
export class UserWorkoutActivityComponent extends UserActivityComponent {
}
