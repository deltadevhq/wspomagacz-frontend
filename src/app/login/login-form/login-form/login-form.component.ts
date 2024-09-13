import { Component, inject, input, output } from '@angular/core';
import { LoginStatus } from '../../login.service';
import { Credentials } from '../../../shared/data-access/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
    standalone: true,
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
    imports: [IonicModule, ReactiveFormsModule],
})
export class LoginFormComponent {
    loginStatus = input.required<LoginStatus>();
    login = output<Credentials>();

    private fb = inject(FormBuilder);

    loginForm = this.fb.nonNullable.group({
        username: ['testowicz', [Validators.required]],
        password: ['Test123!', [Validators.required]],
    });
}
