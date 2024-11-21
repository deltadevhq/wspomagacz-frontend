import { Component } from '@angular/core';
import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonReorder,
  IonReorderGroup,
  IonText,
} from '@ionic/angular/standalone';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-friend-leaderboards',
  templateUrl: './friend-leaderboards.component.html',
  styleUrls: ['./friend-leaderboards.component.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
    IonText,
    NgForOf,
    IonInput,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
    IonReorder,
    IonReorderGroup,
    IonAvatar,
    IonButton,
  ],
})
export class FriendLeaderboardsComponent {
}
