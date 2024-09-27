import { Component, Input } from '@angular/core';
import { Workout } from '../shared/models/Workout';
import { IonicModule } from '@ionic/angular';
import { NgIf } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-workout-info',
    templateUrl: './workout-info.component.html',
    styleUrls: ['./workout-info.component.scss'],
    imports: [IonicModule, NgIf],
})
export class WorkoutInfoComponent {
    @Input() workout?: Workout;
    @Input() duration?: number;
}
