import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../shared/data-access/auth.service';
import { Router } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    private authService = inject(AuthService);
    private router = inject(Router);

    constructor() {
        effect(() => {
            if (this.authService.user()) {
                this.router.navigate(['home']);
            }
        });
    }
}
