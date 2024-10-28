import { Component, Input } from '@angular/core';
import { AuthUser, User } from '../../../shared/models/User';
import { IonAvatar, IonButton, IonButtons, IonIcon, IonProgressBar, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-user-activity-feed',
  templateUrl: './user-activity-feed.component.html',
  styleUrls: ['./user-activity-feed.component.scss'],
  standalone: true,
  imports: [
    IonAvatar,
    IonButton,
    IonButtons,
    IonIcon,
    IonProgressBar,
    IonText,
  ],
})
export class UserActivityFeedComponent {
  @Input({ transform: (value: AuthUser): User => value as User, required: true }) user?: User;
}
