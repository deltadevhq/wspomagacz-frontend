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
  ToastController,
} from '@ionic/angular/standalone';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { FriendRequest } from '../../../shared/models/FriendRequest';
import { FriendService } from '../../../shared/data-access/friend.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { Friend } from '../../../shared/models/User';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../shared/data-access/user.service';

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
    IonBadge,
    NgIf,
    RouterLink,
    IonRouterLink,
    NgOptimizedImage,
    FormsModule,
    IonInput,
    ReactiveFormsModule,
  ],
})
export class FriendsComponent {
  friendRequests: FriendRequest[] | null = null;
  friends: Friend[] | null = null;

  friendService = inject(FriendService);
  friendRequests$ = toObservable(this.friendService.friendRequests);
  friends$ = toObservable(this.friendService.friends);

  username: string = "";

  private fb = inject(FormBuilder);

  addFriendForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
  });

  toastController = inject(ToastController);

  userService = inject(UserService);

  constructor() {
    this.friendRequests$.subscribe((requests) => {
      this.friendRequests = requests;
    });

    this.friends$.subscribe((friends) => {
      this.friends = friends;
    });
  }

  addFriend() {
    this.userService.getUsersByUsername(this.addFriendForm.value.username || "").subscribe((users) => {
      if (users.length > 0) {
        this.friendService.add$.next(users[0].id);
        this.presentSuccessToast();
      } else {
        this.presentErrorToast();
      }
    });
  }

  async presentErrorToast() {
    const toast = await this.toastController.create({
      message: `Nie znaleziono użytkownika o podanej nazwie!`,
      duration: 2000,
      position: 'bottom',
      color: 'primary',
      icon: 'alert-circle',
    });

    await toast.present();
  }

  async presentSuccessToast() {
    const toast = await this.toastController.create({
      message: `Pomyślnie wysłano zaproszenie!`,
      duration: 2000,
      position: 'bottom',
      color: 'success',
      icon: 'checkmark-circle',
    });

    await toast.present();
  }

  protected readonly environment = environment;
}
