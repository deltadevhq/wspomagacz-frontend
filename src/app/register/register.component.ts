import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../shared/data-access/auth.service';
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from './register.service';
import { IonicModule } from '@ionic/angular';
import { LoginFormComponent } from '../login/login-form/login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';

@Component({
    standalone: true,
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    imports: [
        IonicModule,
        LoginFormComponent,
        RouterLink,
        RegisterFormComponent,
    ],
})
export class RegisterComponent {
    protected registerService = inject(RegisterService);
    protected authService = inject(AuthService);
    private router = inject(Router);

    constructor() {
        effect(() => {
            if (this.authService.user()) {
                this.router.navigate(['home']);
            }
        });
    }
}
