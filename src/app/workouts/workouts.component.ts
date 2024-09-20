import { Component, inject } from '@angular/core';
import { WorkoutsCalendarComponent } from './ui/workouts-calendar/workouts-calendar.component';
import { AvatarLevelProgressComponent } from '../home/ui/avatar-level-progress/avatar-level-progress.component';
import { HomeCalendarComponent } from '../home/ui/home-calendar/home-calendar.component';
import { IonicModule } from '@ionic/angular';
import { LevelProgressComponent } from '../home/ui/level-progress/level-progress.component';
import { NgForOf } from '@angular/common';
import { AuthService } from '../shared/data-access/auth.service';

@Component({
    standalone: true,
    selector: 'app-workouts',
    templateUrl: './workouts.component.html',
    styleUrls: ['./workouts.component.scss'],
    imports: [
        WorkoutsCalendarComponent,
        AvatarLevelProgressComponent,
        HomeCalendarComponent,
        IonicModule,
        LevelProgressComponent,
        NgForOf,
    ],
})
export class WorkoutsComponent {
    authService = inject(AuthService);
}
