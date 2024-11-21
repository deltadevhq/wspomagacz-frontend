import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  IonActionSheet,
  IonAvatar,
  IonButton,
  IonButtons,
  IonIcon,
  IonRippleEffect,
  IonRouterLink,
  IonRouterLinkWithHref,
  IonSkeletonText,
  IonText,
  Platform,
} from '@ionic/angular/standalone';
import { UserActivity } from '../../../../shared/models/UserActivity';
import { AsyncPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { DateService } from '../../../../shared/date.service';
import { UserActivityService } from '../../../../shared/data-access/user-activity.service';
import { AuthService } from '../../../../shared/data-access/auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import * as htmlToImage from 'html-to-image';
import { Share } from '@capacitor/share';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.scss'],
  standalone: true,
  imports: [
    IonAvatar,
    IonButton,
    IonButtons,
    IonIcon,
    IonText,
    NgIf,
    IonActionSheet,
    AsyncPipe,
    RouterLink,
    IonRouterLinkWithHref,
    IonRippleEffect,
    IonRouterLink,
    NgOptimizedImage,
    IonSkeletonText,
  ],
})
export class UserActivityComponent {
  @Input() activity?: UserActivity;
  @Input() header = true;
  @Input() footer = true;

  @ViewChild('activityRef', { static: false }) activityRef?: ElementRef;

  activityService = inject(UserActivityService);
  dateService = inject(DateService);
  authService = inject(AuthService);
  authUser$ = toObservable(this.authService.user);

  actionSheetController = inject(ActionSheetController);
  alertController = inject(AlertController);

  platform = inject(Platform);

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      cssClass: 'my-custom-class',
      header: 'Ustawienia aktywności',
      buttons: [
        {
          text: 'Usuń',
          icon: 'trash-bin-outline',
          role: 'destructive',
        },
        {
          text: this.activity?.hidden ? 'Pokaż' : 'Ukryj',
          icon: this.activity?.hidden ? 'earth-outline' : 'eye-off-outline',
          role: this.activity?.hidden ? 'show' : 'hide',
        },
        {
          text: 'Anuluj',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();

    if (role === 'hide') {
      await this.presentHideAlert();
    }

    if (role === 'show') {
      await this.presentShowAlert();
    }

    if (role === 'destructive') {
      await this.presentDeleteAlert();
    }
  }

  async presentHideAlert() {
    const alert = await this.alertController.create({
      mode: 'ios',
      header: 'Jesteś pewien?',
      message: 'Aktywność zostanie ukryta przed innymi użytkownikami, nadal będzie widoczna dla Ciebie.',
      buttons: [
        {
          text: 'Anuluj',
          role: 'cancel',
        },
        {
          text: 'Ukryj',
          role: 'hide',
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

    if (role === 'hide') {
      this.activityService.hide$.next(this.activity!.id);
    }
  }

  async presentShowAlert() {
    const alert = await this.alertController.create({
      mode: 'ios',
      header: 'Jesteś pewien?',
      message: 'Aktywność zostanie udostępniona innym użytkownikom.',
      buttons: [
        {
          text: 'Anuluj',
          role: 'cancel',
        },
        {
          text: 'Pokaż',
          role: 'show',
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

    if (role === 'show') {
      this.activityService.show$.next(this.activity!.id);
    }
  }

  async presentDeleteAlert() {
    const alert = await this.alertController.create({
      mode: 'ios',
      header: 'Jesteś pewien?',
      message: 'Aktywność zostanie trwale usunięta.',
      buttons: [
        {
          text: 'Anuluj',
          role: 'cancel',
        },
        {
          text: 'Usuń',
          role: 'delete',
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

    if (role === 'delete') {
      this.activityService.delete$.next(this.activity!.id);
    }
  }

  getLikesString(activity: UserActivity) {
    if (activity.liked) {
      if (activity.likes === 1) {
        return 'Tylko Ty polubiłeś/aś tą aktywność.';
      } else if (activity.likes === 2) {
        return 'Ty i 1 osoba polubiła tą aktywność.';
      } else if (activity.likes > 2 && activity.likes < 6) {
        return `Ty i ${activity.likes - 1} osoby polubiły tą aktywność.`;
      } else {
        return `Ty i ${activity.likes - 1} osób polubiło tą aktywność.`;
      }
    } else {
      if (activity.likes === 1) {
        return '1 osoba polubiła tą aktywność';
      } else if (activity.likes > 1 && activity.likes < 6) {
        return `${activity.likes} osoby polubiły tą aktywność.`;
      } else {
        return `${activity.likes} osób polubiło tą aktywność.`;
      }
    }
  }

  async shareActivity() {
    const original = this.activityRef?.nativeElement;

    const dataUrl = await htmlToImage.toPng(original);

    if (this.platform.is('desktop')) {
      const img = new Image();
      img.src = dataUrl;
      document.body.append(img);

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `activity-${this.activity?.id}.png`;
      link.click();
      link.remove();
    } else if (this.platform.is('capacitor')) {
      await Share.share({
        url: dataUrl,
      });
    }
  }

  protected readonly environment = environment;
}
