import { Component, Input, OnInit } from '@angular/core';
import { WorkoutExercise } from '../shared/models/Workout';
import { IonicModule, ItemReorderEventDetail } from '@ionic/angular';
import { NgForOf } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-workout-exercise-list',
    templateUrl: './workout-exercise-list.component.html',
    styleUrls: ['./workout-exercise-list.component.scss'],
    imports: [IonicModule, NgForOf],
})
export class WorkoutExerciseListComponent {
    @Input() workoutExercises: WorkoutExercise[] = [];
    @Input() onReorder?: () => void;

    handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
        // The `from` and `to` properties contain the index of the item
        // when the drag started and ended, respectively
        console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

        // Finish the reorder and position the item in the DOM based on
        // where the gesture ended. This method can also be called directly
        // by the reorder group
        ev.detail.complete();
    }
}
