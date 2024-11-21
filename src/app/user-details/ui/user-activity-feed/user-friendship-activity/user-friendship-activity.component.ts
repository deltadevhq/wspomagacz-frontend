import { Component } from '@angular/core';
import { UserActivityComponent } from '../user-activity/user-activity.component';
import {
  IonAvatar,
  IonIcon,
  IonProgressBar,
  IonRouterLink,
  IonRouterLinkWithHref,
  IonText,
} from '@ionic/angular/standalone';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-friendship-activity',
  templateUrl: './user-friendship-activity.component.html',
  styleUrls: ['./user-friendship-activity.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonProgressBar,
    IonText,
    NgIf,
    UserActivityComponent,
    IonAvatar,
    RouterLink,
    IonRouterLinkWithHref,
    IonRouterLink,
    NgOptimizedImage,
  ],
})
export class UserFriendshipActivityComponent extends UserActivityComponent {
}
