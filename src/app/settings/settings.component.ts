import { Component, inject } from '@angular/core';
import { AuthService } from '../shared/data-access/auth.service';
import { environment } from '../../environments/environment';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { UserGender } from '../shared/models/User';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonModal,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { AvatarSettingsComponent } from './avatar-settings/avatar-settings.component';
import { BirthdaySettingsComponent } from './birthday-settings/birthday-settings.component';
import { GenderSettingsComponent } from './gender-settings/gender-settings.component';
import { DisplayNameSettingsComponent } from './display-name-settings/display-name-settings.component';
import { TermsOfServiceComponent } from '../terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { AddCustomExerciseComponent } from './add-custom-exercise/add-custom-exercise.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [
    NgOptimizedImage,
    DatePipe,
    FormsModule,
    IonText,
    IonContent,
    IonIcon,
    IonButton,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonModal,
    IonLabel,
    IonItem,
    IonItemDivider,
    IonAvatar,
    IonList,
    IonBackButton,
  ],
})
export class SettingsComponent {
  authService = inject(AuthService);
  modalController = inject(ModalController);
  protected readonly environment = environment;
  protected readonly UserGender = UserGender;
  protected readonly AvatarSettingsComponent = AvatarSettingsComponent;
  protected readonly BirthdaySettingsComponent = BirthdaySettingsComponent;
  protected readonly GenderSettingsComponent = GenderSettingsComponent;
  protected readonly DisplayNameSettingsComponent = DisplayNameSettingsComponent;
  protected readonly TermsOfServiceComponent = TermsOfServiceComponent;
  protected readonly PrivacyPolicyComponent = PrivacyPolicyComponent;

  async openModal(component: any) {
    const modal = await this.modalController.create({
      component,
    });

    await modal.present();

    await modal.onDidDismiss();
  }

  logout() {
    this.authService.logout().subscribe(
      () => this.modalController.dismiss(),
    );
  }

  protected readonly AddCustomExerciseComponent = AddCustomExerciseComponent;
}
