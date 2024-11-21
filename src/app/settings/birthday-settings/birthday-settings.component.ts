import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/data-access/auth.service';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonFooter,
  IonHeader,
  IonIcon,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-birthday-settings',
  templateUrl: './birthday-settings.component.html',
  styleUrls: ['./birthday-settings.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    IonButton,
    IonFooter,
    IonDatetime,
    IonText,
    IonContent,
    IonIcon,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
  ],
})
export class BirthdaySettingsComponent {
  authService = inject(AuthService);
  modalController = inject(ModalController);

  birthday = new FormControl<string>(this.adjustedBirthday());

  adjustedBirthday() {
    const birthday = this.authService.user()?.birthday;
    const date = new Date(birthday?.toISOString() || new Date().toISOString());
    date.setDate(date.getDate() + 1);
    return date.toISOString();
  }

  onChanged(event: any) {
    this.birthday.setValue(event.target.value);
    this.birthday.markAsDirty();
  }

  async close() {
    await this.modalController.dismiss();
  }

  async save() {
    this.authService.updateUser({ birthday: new Date(this.birthday.getRawValue()!).toLocaleDateString('sv-SE') }).subscribe();

    await this.modalController.dismiss();
  }
}
