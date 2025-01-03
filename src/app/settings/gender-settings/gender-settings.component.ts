import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/data-access/auth.service';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonRadio,
  IonRadioGroup,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserGender } from '../../shared/models/User';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-gender-settings',
  templateUrl: './gender-settings.component.html',
  styleUrls: ['./gender-settings.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonFooter,
    NgIf,
    IonRadio,
    IonLabel,
    IonItem,
    IonRadioGroup,
    IonText,
    IonContent,
    IonIcon,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
    ReactiveFormsModule,
  ],
})
export class GenderSettingsComponent {
  authService = inject(AuthService);
  modalController = inject(ModalController);

  gender = new FormControl<string>(`${this.authService.user()?.gender}`);

  async save() {
    this.authService.updateUser({ gender: this.gender.getRawValue()! }).subscribe();

    await this.modalController.dismiss(null, 'save');
  }

  protected readonly UserGender = UserGender;
}
