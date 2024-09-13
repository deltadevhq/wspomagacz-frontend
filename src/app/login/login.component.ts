import { Component, effect, inject } from '@angular/core';
import { LoginService } from './login.service';
import { AuthService } from '../shared/data-access/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form/login-form.component';
import { IonicModule } from '@ionic/angular';

@Component({
    standalone: true,
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [LoginFormComponent, RouterLink, IonicModule],
})
export class LoginComponent {
    public loginService = inject(LoginService);
    public authService = inject(AuthService);
    private router = inject(Router);

    constructor() {
        effect(() => {
            if (this.authService.user()) {
                this.router.navigate(['home']);
            }
        });
    }
}
