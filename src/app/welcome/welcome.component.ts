import { Component, effect, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../shared/data-access/auth.service';

@Component({
    standalone: true,
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss'],
    imports: [IonicModule, ReactiveFormsModule, NgIf, RouterLink],
})
export class WelcomeComponent {
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
