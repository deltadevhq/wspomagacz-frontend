import { Component, computed, inject } from '@angular/core';
import { IonAvatar, IonRippleEffect, ModalController } from '@ionic/angular/standalone';
import { LevelProgressComponent } from '../level-progress/level-progress.component';
import { AsyncPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { SettingsComponent } from '../../../settings/settings.component';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../data-access/auth.service';

@Component({
  standalone: true,
  selector: 'app-avatar-level-progress',
  templateUrl: './avatar-level-progress.component.html',
  styleUrls: ['./avatar-level-progress.component.scss'],
  imports: [
    IonAvatar,
    NgIf,
    AsyncPipe,
    IonRippleEffect,
    NgOptimizedImage,
  ],
})
export class AvatarLevelProgressComponent extends LevelProgressComponent {
  degree = computed(() => (this.experienceService.level()?.progress ?? 0) * 360);

  modalController = inject(ModalController);
  authService = inject(AuthService);

  async openSettingsModal() {
    const modal = await this.modalController.create({
      component: SettingsComponent,
    });

    await modal.present();

    await modal.onDidDismiss();
  }

  protected readonly environment = environment;
}
