import { Component, OnInit } from '@angular/core';
import {
  IonAvatar,
  IonBadge,
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonText,
} from '@ionic/angular/standalone';
import { NgForOf } from '@angular/common';

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
  ],
})
export class FriendsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
