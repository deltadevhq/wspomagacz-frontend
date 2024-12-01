import { Component } from '@angular/core';
import { UserActivityComponent } from '../user-activity/user-activity.component';
import { IonIcon, IonProgressBar, IonText } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { WorkoutExerciseSet } from '../../../../shared/models/Workout';

@Component({
  selector: 'app-user-personal-best-activity',
  templateUrl: './user-personal-best-activity.component.html',
  styleUrls: ['./user-personal-best-activity.component.scss'],
  standalone: true,
  imports: [
    IonProgressBar,
    IonText,
    NgIf,
    UserActivityComponent,
    IonIcon,
  ],
})
export class UserPersonalBestActivityComponent extends UserActivityComponent {
  getMaxWeight(): number {
    return Math.max(...this.activity?.data.sets.map((set: WorkoutExerciseSet) => set.weight) || [0]);
  }
}
