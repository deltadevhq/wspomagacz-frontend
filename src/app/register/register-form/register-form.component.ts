import { Component, inject, input, output } from '@angular/core';
import { CreateUserCredentials } from '../../shared/data-access/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterStatus } from '../register.service';
import { IonicModule } from '@ionic/angular';

@Component({
    standalone: true,
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss'],
    imports: [IonicModule, ReactiveFormsModule],
})
export class RegisterFormComponent {
    registerStatus = input.required<RegisterStatus>();
    createUser = output<CreateUserCredentials>();

    private fb = inject(FormBuilder);

    registerForm = this.fb.nonNullable.group({
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
    });
}
