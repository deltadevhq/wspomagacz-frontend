import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/data-access/auth.service';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-display-name-settings',
  templateUrl: './display-name-settings.component.html',
  styleUrls: ['./display-name-settings.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonText,
    IonInput,
    IonFooter,
    NgIf,
    ReactiveFormsModule,
  ],
})
export class DisplayNameSettingsComponent {
  authService = inject(AuthService);
  modalController = inject(ModalController);

  displayName = new FormControl<string>(`${this.authService.user()?.display_name}`, {
    validators: [
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.pattern(/^(?!.*\s{2,})[A-Za-z0-9ĄąĆćĘęŁłŃńÓóŚśŹźŻż]+(?: [A-Za-z0-9ĄąĆćĘęŁłŃńÓóŚśŹźŻż]+)*$/),
    ],
  });

  async save() {
    this.authService.updateUser({ display_name: this.displayName.getRawValue()! }).subscribe();

    await this.modalController.dismiss(null, 'save');
  }
}
