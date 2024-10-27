import { Component, inject, input, output } from '@angular/core';
import { CreateUserCredentials } from '../../shared/data-access/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterStatus } from '../register.service';
import { IonButton, IonInput, IonInputPasswordToggle, IonToast } from '@ionic/angular/standalone';

@Component({
  standalone: true,
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  imports: [ReactiveFormsModule, IonInput, IonInputPasswordToggle, IonToast, IonButton],
})
export class RegisterFormComponent {
  registerStatus = input.required<RegisterStatus>();
  createUser = output<CreateUserCredentials>();

  private fb = inject(FormBuilder);

  registerForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)], Validators.maxLength(30), Validators.pattern(/^[a-zA-Z0-9]*$/)],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
  });
}
