import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { RegisterService } from './data-access/register.service';
import { AuthService } from '../shared/data-access/auth.service';
import { Router, RouterLink } from '@angular/router';
import { RegisterFormComponent } from './ui/register-form/register-form.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RegisterFormComponent, RouterLink, IonButton, IonButtons, IonBackButton, IonText],
})
export class RegisterPage {
  registerService = inject(RegisterService);
  authService = inject(AuthService);
  router = inject(Router);

  constructor() {
    effect(() => {
      if (this.authService.user()) {
        this.router.navigate(['/home']);
      }
    });
  }
}
