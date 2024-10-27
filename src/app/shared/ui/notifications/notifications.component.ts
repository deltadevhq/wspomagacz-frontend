import { Component, inject, ViewChild } from '@angular/core';
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { NotificationsService } from '../../data-access/notifications.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonModal,
    NgIf,
    AsyncPipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    NgForOf,
    IonBadge,
    IonText,
  ],
})
export class NotificationsComponent {
  notificationService = inject(NotificationsService);
  notifications$ = toObservable(this.notificationService.notifications);

  @ViewChild(IonModal) modal!: IonModal;
}
