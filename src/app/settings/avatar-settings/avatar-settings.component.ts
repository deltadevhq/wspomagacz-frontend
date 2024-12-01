import { Component, inject } from '@angular/core';
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
  ToastController,
} from '@ionic/angular/standalone';
import { FormControl, FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/data-access/auth.service';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-avatar-settings',
  templateUrl: './avatar-settings.component.html',
  styleUrls: ['./avatar-settings.component.scss'],
  standalone: true,
  imports: [
    NgOptimizedImage,
    IonAvatar,
    IonText,
    IonContent,
    IonIcon,
    IonButton,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonFooter,
    NgIf,
    FormsModule,
  ],
})
export class AvatarSettingsComponent {
  authService = inject(AuthService);
  modalController = inject(ModalController);
  toastController = inject(ToastController);

  avatar = new FormControl<string>(`${environment.baseUrl}users/${this.authService.user()?.id}/avatar`);

  async fileChanged(event: any) {
    const file = event.target.files[0];

    if (file.size > 512 * 1024) { // 512KB
      await this.presentErrorToast('Zdjęcie nie może być większe niż 512KB!');
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      this.avatar.setValue(reader.result as string);

      this.avatar.markAsDirty();
    };
  }

  async presentErrorToast(message: string) {
    const toast = await this.toastController.create({
      color: 'primary',
      icon: 'alert-circle',
      message: message,
      duration: 2000,
    });

    await toast.present();
  }

  async save() {
    const byteString = atob(this.avatar.value?.split(',')[1] || '');
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    const file = new File([uint8Array], 'avatar.jpg', { type: 'image/jpeg' });

    this.authService.updateAvatar(file).subscribe((() => window.location.reload()));

    await this.modalController.dismiss();
  }
}
