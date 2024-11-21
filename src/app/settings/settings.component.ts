import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../shared/data-access/auth.service';
import { environment } from '../../environments/environment';
import { DatePipe, NgIf, NgOptimizedImage } from '@angular/common';
import { UserGender } from '../shared/models/User';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';
import { AvatarSettingsComponent } from './avatar-settings/avatar-settings.component';
import { BirthdaySettingsComponent } from './birthday-settings/birthday-settings.component';
import { GenderSettingsComponent } from './gender-settings/gender-settings.component';
import { DisplayNameSettingsComponent } from './display-name-settings/display-name-settings.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgOptimizedImage,
    DatePipe,
    FormsModule,
    NgIf,
  ],
})
export class SettingsComponent {
  authService = inject(AuthService);
  modalController = inject(ModalController);

  async openModal(component: any) {
    const modal = await this.modalController.create({
      component,
    });

    await modal.present();

    await modal.onDidDismiss();
  }

  async close() {
    await this.modalController.dismiss();
  }

  protected readonly environment = environment;
  protected readonly UserGender = UserGender;
  protected readonly AvatarSettingsComponent = AvatarSettingsComponent;
  protected readonly BirthdaySettingsComponent = BirthdaySettingsComponent;
  protected readonly GenderSettingsComponent = GenderSettingsComponent;
  protected readonly DisplayNameSettingsComponent = DisplayNameSettingsComponent;
}
