import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { AuthService } from '../shared/data-access/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LoginFormComponent } from './ui/login-form/login-form.component';
import { LoginService } from './data-access/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, LoginFormComponent, RouterLink, IonSpinner, IonBackButton, IonButtons, IonText],
})
export class LoginPage {
  loginService = inject(LoginService);
  authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (this.authService.user()) {
        this.router.navigate(['/home']);
      }
    });
  }
}
