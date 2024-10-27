import { Component, inject, input, output } from '@angular/core';
import { LoginStatus } from '../login.service';
import { Credentials } from '../../shared/data-access/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonInput, IonInputPasswordToggle, IonToast } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  imports: [ReactiveFormsModule, IonInput, IonInputPasswordToggle, IonToast, IonButton, NgIf],
})
export class LoginFormComponent {
  loginStatus = input.required<LoginStatus>();
  login = output<Credentials>();

  private fb = inject(FormBuilder);

  loginForm = this.fb.nonNullable.group({
    username: ['testowicz', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    password: ['Test123!', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
  });
}
