import { Component, inject } from '@angular/core';
import { NotificationService } from '../../../data-access/notification.service';
import { toObservable } from '@angular/core/rxjs-interop';
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
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { DateService } from '../../../date.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonButtons,
    IonToolbar,
    IonHeader,
    IonTitle,
    IonContent,
    IonBadge,
    IonItem,
    IonLabel,
    IonList,
    IonText,
    AsyncPipe,
    NgForOf,
    NgIf,
    NgClass,
  ],
})
export class NotificationListComponent {
  notificationService = inject(NotificationService);
  notifications$ = toObservable(this.notificationService.notifications);

  dateService = inject(DateService);

  modalController = inject(ModalController);
}
