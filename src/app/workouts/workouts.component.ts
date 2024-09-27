import { Component, inject } from '@angular/core';
import { WorkoutsCalendarComponent } from './ui/workouts-calendar/workouts-calendar.component';
import { AvatarLevelProgressComponent } from '../home/ui/avatar-level-progress/avatar-level-progress.component';
import { HomeCalendarComponent } from '../home/ui/home-calendar/home-calendar.component';
import { IonicModule } from '@ionic/angular';
import { LevelProgressComponent } from '../home/ui/level-progress/level-progress.component';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { AuthService } from '../shared/data-access/auth.service';
import { WorkoutInfoComponent } from '../workout-info/workout-info.component';
import { Workout } from '../shared/models/Workout';

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
        AsyncPipe,
        NgIf,
        WorkoutInfoComponent,
    ],
})
export class WorkoutsComponent {
    authService = inject(AuthService);

    selectedWorkout?: Workout;
    selectedWorkoutDuration?: number;

    onSelectedWorkoutChange(workout: Workout) {
        this.selectedWorkout = workout;
    }

    onSelectedWorkoutDurationChange(duration?: number) {
        this.selectedWorkoutDuration = duration;
    }
}
