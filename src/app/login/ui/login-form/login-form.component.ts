import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonInput, IonInputPasswordToggle } from '@ionic/angular/standalone';
import { LoginStatus } from '../../data-access/login.service';
import { Credentials } from '../../../shared/data-access/auth.service';

@Component({
  standalone: true,
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  imports: [ReactiveFormsModule, IonInput, IonInputPasswordToggle, IonButton],
})
export class LoginFormComponent {
  loginStatus = input.required<LoginStatus>();
  login = output<Credentials>();

  private fb = inject(FormBuilder);

  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
  });
}
