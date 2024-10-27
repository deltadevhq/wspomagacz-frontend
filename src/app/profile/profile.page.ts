import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonProgressBar,
  IonRippleEffect,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { LevelProgressComponent } from '../shared/ui/level-progress/level-progress.component';
import { AuthService } from '../shared/data-access/auth.service';
import { Router } from '@angular/router';
import { AvatarLevelProgressComponent } from '../shared/ui/avatar-level-progress/avatar-level-progress.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonAvatar, IonRippleEffect, IonItem, IonLabel, LevelProgressComponent, IonText, IonButton, IonIcon, IonButtons, IonBackButton, IonSegment, IonSegmentButton, AvatarLevelProgressComponent, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonProgressBar],
})
export class ProfilePage {
  public authService = inject(AuthService);
  private router = inject(Router);

  segment = 'feed';

  constructor() {
    effect(() => {
      if (!this.authService.user()) {
        this.router.navigate(['/welcome']);
      }
    });
  }

  segmentChanged(event: CustomEvent) {
    this.segment = event.detail.value;
  }
}
