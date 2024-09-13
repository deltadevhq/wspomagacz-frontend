import { Component, effect, inject, input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgForOf } from '@angular/common';
import { HomeCalendarComponent } from './ui/home-calendar/home-calendar.component';
import { AuthService, AuthUser } from '../shared/data-access/auth.service';
import { Router } from '@angular/router';
import { LevelProgressComponent } from './ui/level-progress/level-progress.component';
import { AvatarLevelProgressComponent } from './ui/avatar-level-progress/avatar-level-progress.component';

@Component({
    standalone: true,
    selector: 'app-home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [
        IonicModule,
        NgForOf,
        HomeCalendarComponent,
        LevelProgressComponent,
        AvatarLevelProgressComponent,
    ],
})
export class HomeComponent {
    public authService = inject(AuthService);
    private router = inject(Router);

    constructor() {
        effect(() => {
            if (!this.authService.user()) {
                this.router.navigate(['welcome']);
            }
        });
    }
}
