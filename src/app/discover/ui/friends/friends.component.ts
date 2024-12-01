import { Component, inject } from '@angular/core';
import {
  IonAvatar,
  IonBadge,
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRouterLink,
  IonText,
} from '@ionic/angular/standalone';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { FriendRequest } from '../../../shared/models/FriendRequest';
import { FriendService } from '../../../shared/data-access/friend.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { Friend } from '../../../shared/models/User';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
  standalone: true,
  imports: [
    IonAvatar,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonText,
    NgForOf,
    IonInput,
    IonBadge,
    NgIf,
    RouterLink,
    IonRouterLink,
    NgOptimizedImage,
  ],
})
export class FriendsComponent {
  friendRequests: FriendRequest[] | null = null;
  friends: Friend[] | null = null;

  friendService = inject(FriendService);
  friendRequests$ = toObservable(this.friendService.friendRequests);
  friends$ = toObservable(this.friendService.friends);

  constructor() {
    this.friendRequests$.subscribe((requests) => {
      this.friendRequests = requests;
    });

    this.friends$.subscribe((friends) => {
      this.friends = friends;
    });
  }

  protected readonly environment = environment;
}
