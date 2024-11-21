import { Component, inject } from '@angular/core';
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
  IonPopover,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationService } from '../../data-access/notification.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

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
    NgClass,
    IonPopover,
    NotificationListComponent,
  ],
})
export class NotificationsComponent {
  notificationService = inject(NotificationService);
  notifications$ = toObservable(this.notificationService.notifications);

  unreadCount$ = this.notifications$.pipe(
    map((notifications) => notifications.filter((notification) => !notification.read).length),
  );

  private modalController = inject(ModalController);

  async openNotifications() {
    const modal = await this.modalController.create({
      component: NotificationListComponent,
    });

    await modal.present();

    await modal.onDidDismiss();
  }
}
